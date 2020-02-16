import threadpool
from ko_host.models import Host


# @periodic_task(run_every=crontab(minute='*/5'), name='task.host_health_check')
def host_health_check():
    def host_health(host: Host):
        host.health_check()

    hosts = Host.objects.all()
    for i in range(0, len(hosts), 5):
        pool = threadpool.ThreadPool(5)
        end = i + 5
        if end > len(hosts):
            end = len(hosts)
        requests = threadpool.makeRequests(host_health, hosts[i:end])
        for req in requests:
            pool.putRequest(req)
        pool.wait()


# @periodic_task(run_every=crontab(minute='*/1'), name='task.host_heart_beat')
def host_heart_beat():
    def heart_beat(host: Host):
        host.ping()

    hosts = Host.objects.all()
    for i in range(0, len(hosts), 5):
        pool = threadpool.ThreadPool(5)
        end = i + 5
        if end > len(hosts):
            end = len(hosts)
        requests = threadpool.makeRequests(heart_beat, hosts[i:end])
        for req in requests:
            pool.putRequest(req)
        pool.wait()
