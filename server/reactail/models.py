from __future__ import absolute_import, unicode_literals
import datetime
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import ugettext_lazy as _
from django.db import models
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.blocks import RichTextBlock
from wagtail.wagtailadmin.edit_handlers import FieldPanel, MultiFieldPanel, \
    FieldRowPanel, StreamFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel

from reactail.blocks import ImageBlock, HeadingBlock, LatestBlogPostsBlock


class MenuPage(Page):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.show_in_menus = True

    class Meta:
        abstract = True


class ContentPage(MenuPage):
    body = StreamField([
        ('heading', HeadingBlock()),
        ('richtext', RichTextBlock()),
        ('image', ImageBlock()),
    ])

    content_panels = MenuPage.content_panels + [
        StreamFieldPanel('body'),
    ]

    api_fields = [
        'body',
    ]

    parent_page_types = ['reactail.HomePage', 'reactail.ContentPage']
    subpage_types = ['reactail.ContentPage', 'reactail.BlogIndexPage']

    class Meta:
        verbose_name = _('Content page')
        verbose_name_plural = _('Content pages')


class HomePage(ContentPage):
    parent_page_types = ['wagtailcore.Page']

    @classmethod
    def can_create_at(cls, parent):
        # You can only create one of these!
        return super(HomePage, cls).can_create_at(parent) \
            and not cls.objects.exists()

    parent_page_types = ['wagtailcore.Page']
    subpage_types = ['reactail.ContentPage', 'reactail.BlogIndexPage']

    class Meta:
        verbose_name = _('Home page')
        verbose_name_plural = _('Home pages')


class BlogIndexPage(MenuPage):
    body = StreamField([
        ('heading', HeadingBlock()),
        ('richtext', RichTextBlock()),
        ('image', ImageBlock()),
        ('blog_posts', LatestBlogPostsBlock()),
    ])

    content_panels = MenuPage.content_panels + [
        StreamFieldPanel('body'),
    ]

    api_fields = [
        'body',
    ]

    parent_page_types = ['reactail.HomePage', 'reactail.ContentPage']
    subpage_types = ['reactail.BlogPost']

    class Meta:
        verbose_name = _('Blog index')


class BlogPost(Page):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.content_type = ContentType.objects.get_for_model(BlogPost)
        self.show_in_menus = False  # force

    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name=_('Post image')
    )

    published_at = models.DateField(
        _('Post date'), default=datetime.datetime.today,
        help_text=_('This date may be displayed on the blog post. It is not '
                    'used to schedule posts to go live at a later date.')
    )

    body = StreamField([
        ('heading', HeadingBlock()),
        ('richtext', RichTextBlock()),
        ('image', ImageBlock()),
    ])

    # removed 'show_in_menus'
    promote_panels = [
        MultiFieldPanel([
            FieldPanel('slug'),
            FieldPanel('seo_title'),
            FieldPanel('search_description'),
        ], _('Common page configuration')),
    ]

    settings_panels = [
        MultiFieldPanel([
            FieldRowPanel([
                FieldPanel('go_live_at'),
                FieldPanel('expire_at'),
            ], classname='label-above'),
        ], _('Scheduled publishing'), classname='publishing'),
        FieldPanel('published_at'),
    ]

    content_panels = Page.content_panels + [
        ImageChooserPanel('image'),
        StreamFieldPanel('body'),
    ]

    api_fields = [
        'image',
        'published_at',
        'body',
    ]

    parent_page_types = ['reactail.BlogIndexPage']

    class Meta:
        verbose_name = _('Blog page')
        verbose_name_plural = _('Blog pages')
