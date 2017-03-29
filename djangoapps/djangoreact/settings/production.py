from __future__ import absolute_import, unicode_literals

from .base import *

if DEBUG:
    raise ValueError('DEBUG is True in production!')
