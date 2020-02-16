from ansible_api.models import Group


class Role(Group):
    class Meta:
        proxy = True

    def __str__(self):
        return "%s %s" % (self.project, self.name)

