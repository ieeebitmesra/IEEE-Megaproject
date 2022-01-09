from django.db import models



# ***>>>NEET COURSES<<<****
class nacphy(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name
      
   
class nacchem(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nacbio(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nbcphy(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nbcchem(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nbcbio(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


# ****>>>NEET MATERIALS<<<******   
class namphy(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class namchem(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nambio(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nbmphy(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nbmchem(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nbmbio(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

 
# ***>>>NEET TESTS<<<<*******
class natphy(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class natchem(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class natbio(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nbtphy(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nbtchem(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

   
class nbtbio(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


# *****>>>>BOARDS COURSES<<<<*****
class bcphy(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class bcchem(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class bcmath(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class bcbio(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


# *****>>>>BOARDS MATERIALS<<<<*****
class bmphy(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class bmchem(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class bmmath(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class bmbio(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


# *****>>>>BOARDS TEST<<<<*****
class btphy(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

      
class btchem(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class btmath(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class btbio(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


# ****>>>>>JEE<<<<********
class jacps(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

class jacms(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jaccs(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

class jamps(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jamcs(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jamms(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jatps(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jatcs(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jatms(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

# ****>>>>>JEE-12<<<<********
class jbcps(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jbcms(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jbccs(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jbmps(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jbmcs(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jbmms(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name

      
class jbtps(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jbtcs(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name


class jbtms(models.Model):
   name=models.CharField(max_length=1000)
   batan=models.CharField(max_length=1000,default="some_string")
   url=models.CharField(max_length=1000,default="some_string")

   def __str__(self):
      return self.name