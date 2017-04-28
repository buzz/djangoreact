from django.conf import settings
from wagtail.wagtailimages.blocks import ImageChooserBlock


class ReactImageChooserBlock(ImageChooserBlock):
    def get_api_representation(self, image, context=None):
        rendition = image.get_rendition(settings.WAGTAIL_RENDITIONS['default'])
        return {
            'title': image.title,
            'url': rendition.url,
        }
