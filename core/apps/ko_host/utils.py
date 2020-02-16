from ansible_api.models import Host
from common.ssh import SshConfig


def parse_host_to_ssh_config(host: Host) -> SshConfig:
    return SshConfig(
        host.ip,
        host.port,
        host.username,
        host.password,
        host.private_key,
    )


def parse_host_to_adhoc_config(host: Host) -> dict:
    return {
        "ip": host.ip,
        "username": host.username,
        "password": host.password,
        "private_key_path": host.private_key,
        "name": "default",
        "port": host.port
    }
