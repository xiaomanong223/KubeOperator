import time

from common.ssh import SSHClient
from ko_host.consts import HOST_CPU_THRESHOLD, HOST_MEMORY_THRESHOLD
from ko_host.models import Host, Condition
from ko_host.utils import parse_host_to_ssh_config


class AbstractHealthChecker:
    def __init__(self, host: Host):
        self.host = host

    def check(self) -> Condition:
        pass


class CPUPressureHealthChecker(AbstractHealthChecker):

    def check(self) -> Condition:
        client = SSHClient(parse_host_to_ssh_config(self.host))
        cmd = "top -b -n1 | fgrep \"Cpu(s)\" | tail -1 | awk -F'id,' '{split($1, vs, \",\");" \
              " v=vs[length(vs)]; sub(" \
              "/\s+/, \"\", v);sub(/\s+/, \"\", v); printf \"%s\", 100-v; }' "
        result, code = client.run_cmd(cmd)
        if code == 0:
            cond = Condition(
                type="host cpu health check",
                reason="host  no CPU pressure",
                status=True,
                last_time=time.time()
            )
            if float(result) > HOST_CPU_THRESHOLD:
                cond.status = False
            cond.save()
            return cond


class MemoryPressureHealthChecker(AbstractHealthChecker):

    def check(self) -> Condition:
        client = SSHClient(parse_host_to_ssh_config(self.host))
        cmd = "free -m | awk -F '[ :]+' 'NR==2{printf \"%.2f\", ($2-$7)/$2*100}'"
        result, code = client.run_cmd(cmd)
        if code == 0:
            cond = Condition(
                type="host memory health check",
                reason="host no memory pressure",
                status=True,
                last_time=time.time()
            )
            if float(result) > HOST_MEMORY_THRESHOLD:
                cond.status = False
            cond.save()
            return cond


class DiskPressureHealthChecker(AbstractHealthChecker):
    # TODO: gather disk pressure
    def check(self) -> Condition:
        pass


class HostHealthCheck:
    checkers = [CPUPressureHealthChecker, MemoryPressureHealthChecker]

    def __init__(self, host):
        self.host = host

    def go(self) -> []:
        conditions = []
        for h in self.checkers:
            result = h.check()
            conditions.append(result)
        return conditions
