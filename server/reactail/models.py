from __future__ import absolute_import, unicode_literals

from wagtail.wagtailcore import blocks
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore.models import Page
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel

from reactail.blocks import ImageBlock, HeadingBlock


class HomePage(Page):
    body = StreamField([
        ('heading', HeadingBlock()),
        ('richtext', blocks.RichTextBlock()),
        ('image', ImageBlock()),
    ])

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]

    api_fields = [
        'body',
    ]
