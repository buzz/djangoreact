from django.conf import settings
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailcore.blocks import CharBlock, ChoiceBlock, StructBlock, \
    StaticBlock


class ImageBlock(StructBlock):
    """
    `StructBlock`: image with caption and alignment
    """
    image = ImageChooserBlock(required=True)
    caption = CharBlock(required=False)
    style = ChoiceBlock(
        choices=settings.WAGTAIL_IMAGE_CHOICES, required=True,
        default=settings.WAGTAIL_IMAGE_CHOICES[0][0])

    def get_api_representation(self, value, context=None):
        key = value['style']
        alignment, rend_style = settings.WAGTAIL_IMAGE_PRESETS[key]
        rendition = value['image'].get_rendition(rend_style)
        resp = {
            'alt': value['image'].title,
            'url': rendition.url,
            'alignment': alignment,
        }
        if ('caption' in value and len(value['caption']) > 0):
            resp['caption'] = value['caption']
        return resp

    class Meta:
        icon = 'image'


class HeadingBlock(StructBlock):
    """
    `StructBlock` that allows the user to select h2 - h6 sizes for headers
    """
    text = CharBlock(required=True)
    size = ChoiceBlock(choices=[
        ('', 'Select a header size'),
        ('h2', 'H2'),
        ('h3', 'H3'),
        ('h4', 'H4'),
        ('h4', 'H5'),
        ('h5', 'H6'),
    ], required=True, default=('h2'))

    class Meta:
        icon = 'title'


class LatestBlogPostsBlock(StaticBlock):
    """
    Displays a list of blog posts
    """
    class Meta:
        icon = 'list-ul'
        label = 'Latest posts'
        admin_text = 'Shows latest blog posts.'
        help_text = 'barbar help_texthelp_texthelp_text'
