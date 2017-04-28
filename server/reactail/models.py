from __future__ import absolute_import, unicode_literals

from wagtail.wagtailcore import blocks
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore.models import Page
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel

from reactail.blocks import ReactImageChooserBlock


class HomePage(Page):
    body = StreamField([
        ('heading', blocks.CharBlock()),
        ('richtext', blocks.RichTextBlock()),
        ('image', ReactImageChooserBlock()),
    ])

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]

    api_fields = [
        'body',
    ]
