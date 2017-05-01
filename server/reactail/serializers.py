from django.conf import settings
from django.template.defaultfilters import truncatewords_html
from rest_framework.fields import Field, DateTimeField, \
    ImageField as WagtailImageField
from wagtail.wagtailcore.blocks import RichTextBlock
from wagtail.api.v2.serializers import PageSerializer
from wagtail.api.v2.utils import pages_for_site


class ExcerptField(Field):
    """
    Extracts 20 words from first `RichTextBlock` found in body field.
    """

    def get_attribute(self, instance):
        try:
            return instance.specific.body
        except AttributeError:
            return None

    def to_representation(self, body):
        for child in body:
            block = child.block
            if type(block) == RichTextBlock:
                return truncatewords_html(child.render(), 40)
        return None


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


class ImageField(WagtailImageField):
    """
    Serializes an image.
    """

    def get_attribute(self, instance):
        try:
            return instance.specific.image
        except AttributeError:
            return None

    def to_representation(self, image):
        alignment, rend_style = settings.WAGTAIL_IMAGE_PRESETS['wide']
        rendition = image.get_rendition(rend_style)
        return {
            'alt': image.title,
            'url': rendition.url,
        }


class PublishedAtField(DateTimeField):
    """
    Serializes a date.
    """

    def get_attribute(self, instance):
        try:
            return instance.specific.published_at
        except AttributeError:
            return None

    def to_representation(self, date):
        return date


class ReactPageSerializer(PageSerializer):
    """Serializes a Page."""
    excerpt = ExcerptField(read_only=True)
    published_at = PublishedAtField(read_only=True)
    parent = PageParentIdField(read_only=True)
    url_path = PagePathField(read_only=True)
    image = ImageField(read_only=True)
