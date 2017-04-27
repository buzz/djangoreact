from __future__ import absolute_import, unicode_literals
import sys
import os

from djangoapps.reactail.settings.base import *


if DEBUG:
    print('Error: DEBUG is True in production!')
    sys.exit(-1)
