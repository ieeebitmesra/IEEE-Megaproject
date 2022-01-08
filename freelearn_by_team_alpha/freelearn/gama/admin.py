from django.contrib import admin
# from . models import video
# ****>>>>>NEET<<<<<****
from . models import nacphy
from . models import nacchem
from . models import nacbio
from . models import nbcphy
from . models import nbcchem
from . models import nbcbio

from . models import namphy
from . models import namchem
from . models import nambio
from . models import nbmphy
from . models import nbmchem
from . models import nbmbio

from . models import natphy
from . models import natchem
from . models import natbio
from . models import nbtphy
from . models import nbtchem
from . models import nbtbio

# ****>>>BOARDS<<<<*****
from . models import bcphy
from . models import bcchem
from . models import bcmath
from . models import bcbio

from . models import bmphy
from . models import bmchem
from . models import bmmath
from . models import bmbio

from . models import btphy
from . models import btchem
from . models import btmath
from . models import btbio

# ******>>>>JEE<<<<<******
from . models import jacms,jaccs,jacps,jatps,jatcs,jatms,jamms,jamcs,jamps

# ******>>>>JEE-12<<<<<******
from . models import jbcms,jbccs,jbcps,jbtps,jbtcs,jbtms,jbmms,jbmcs,jbmps

# admin.site.register(video)
# ****>>>NEET<<<<*****
admin.site.register(nacphy)
admin.site.register(nacchem)
admin.site.register(nacbio)
admin.site.register(nbcphy)
admin.site.register(nbcchem)
admin.site.register(nbcbio)

admin.site.register(namphy)
admin.site.register(namchem)
admin.site.register(nambio)
admin.site.register(nbmphy)
admin.site.register(nbmchem)
admin.site.register(nbmbio)

admin.site.register(natphy)
admin.site.register(natchem)
admin.site.register(natbio)
admin.site.register(nbtphy)
admin.site.register(nbtchem)
admin.site.register(nbtbio)

# ****>>>>BOARDS<<<<****
admin.site.register(bcphy)
admin.site.register(bcchem)
admin.site.register(bcmath)
admin.site.register(bcbio)

admin.site.register(bmphy)
admin.site.register(bmchem)
admin.site.register(bmmath)
admin.site.register(bmbio)

admin.site.register(btphy)
admin.site.register(btchem)
admin.site.register(btmath)
admin.site.register(btbio)

# *****>>>>>JEE<<<<<<******
admin.site.register(jacps)
admin.site.register(jacms)
admin.site.register(jaccs)
admin.site.register(jamps)
admin.site.register(jamcs)
admin.site.register(jamms)
admin.site.register(jatps)
admin.site.register(jatcs)
admin.site.register(jatms)

# *****>>>>>JEE-12<<<<<<******
admin.site.register(jbcps)
admin.site.register(jbcms)
admin.site.register(jbccs)
admin.site.register(jbmps)
admin.site.register(jbmcs)
admin.site.register(jbmms)
admin.site.register(jbtps)
admin.site.register(jbtcs)
admin.site.register(jbtms)