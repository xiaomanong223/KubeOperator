from common.ssh import SSHClient
from ko_host.adhoc import get_host_setup_info
from ko_host.models import Host, Volume, GPU
from ko_host.utils import parse_host_to_ssh_config


class AbstractHandler:
    def __init__(self, host: Host):
        self.host = host

    def run(self):
        pass


class BasicInfoHandler(AbstractHandler):
    def run(self) -> dict:
        setup_info = get_host_setup_info(self.host)
        basic = {
            "hostname": setup_info['ansible_hostname'],
            "memory": setup_info["ansible_memtotal_mb"],
            "cpu_core": setup_info["ansible_processor_vcpus"],
            "os_distribution": setup_info["ansible_distribution"],
            "os_distribution_version": setup_info["ansible_distribution_version"],
            "architecture": setup_info["ansible_architecture"],
            "kernel": setup_info["ansible_kernel"]
        }
        result = {"basic": basic}
        return result


class VolumeInfoHandler(AbstractHandler):
    def run(self) -> dict:
        setup_info = get_host_setup_info(self.host)
        devices = setup_info["ansible_devices"]
        volumes = []
        for name in devices:
            if not name.startswith(('dm', 'loop', 'sr')):
                volume = Volume(name='/dev/' + name)
                volume.size = devices[name]['size']
                volume.save()
                volumes.append(volume)
        result = {"volumes": volumes}
        return result


class GpuInfoHandler(AbstractHandler):
    def run(self) -> dict:
        gpus = []
        client = SSHClient(parse_host_to_ssh_config(self.host))
        cmd = "lspci | grep -i nvidia"
        result, code = client.run_cmd(cmd)
        if code == 0:
            host_gpus = str(result).split('\n')
            for hg in host_gpus:
                g = GPU()
                g.name = hg[hg.index("[") + 1:hg.index("]")]
                g.save()
                gpus.append(g)
        result = {"gpus": gpus}
        return result


class HostInfoCollector:
    handlers = [BasicInfoHandler, GpuInfoHandler]

    def __init__(self, host):
        self.host = host

    def go(self):
        self.host.ping()
        result = {}
        for handler in self.handlers:
            h = handler(self.host)
            result.update(h.run())
        return result
