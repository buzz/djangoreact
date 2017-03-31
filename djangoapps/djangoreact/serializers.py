from rest_framework.fields import Field
from wagtail.api.v2.serializers import PageSerializer
from wagtail.wagtailcore.templatetags.wagtailcore_tags import richtext


class PageRichTextField(Field):
    def to_representation(self, value):
        return richtext(value)


class ReactPageSerializer(PageSerializer):
    body = PageRichTextField(read_only=True)
