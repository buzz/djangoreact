from rest_framework.fields import Field
from wagtail.api.v2.serializers import PageSerializer
from wagtail.api.v2.utils import pages_for_site
from wagtail.wagtailcore.templatetags.wagtailcore_tags import richtext


class PageParentIdField(Field):
    """
    Only outputs the ID not a deep representation.
    """

    def get_attribute(self, instance):
        parent = instance.get_parent()

        site_pages = pages_for_site(self.context['request'].site)
        if site_pages.filter(id=parent.id).exists():
            return parent

    def to_representation(self, page):
        return page.id


class PagePathField(Field):
    """
    Serializes the page path.

    Example:
    "url_path": "/history/us/"
    """

    def get_attribute(self, instance):
        return instance

    def to_representation(self, page):
        return page.get_url_parts()[2]


class PageRichTextField(Field):
    """
    Outputs a processed version of a RichText field.
    """

    def to_representation(self, value):
        return richtext(value)


class ReactPageSerializer(PageSerializer):
    """Serializes a Page."""
    parent = PageParentIdField(read_only=True)
    url_path = PagePathField(read_only=True)
