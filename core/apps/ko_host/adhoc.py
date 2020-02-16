from ansible_api.tasks import run_im_adhoc
from ko_host.models import Host
from ko_host.utils import parse_host_to_adhoc_config


def get_host_setup_info(host: Host):
    hosts = [parse_host_to_adhoc_config(host)]
    result = run_im_adhoc(adhoc_data={'pattern': "default", 'module': 'setup'},
                          inventory_data={'hosts': hosts, 'vars': {}})
    if is_adhoc_success(result):
        return result["raw"]["ok"]["default"]["setup"]["ansible_facts"]


def is_adhoc_success(result):
    return result.get('summary', {}).get('success', False)
