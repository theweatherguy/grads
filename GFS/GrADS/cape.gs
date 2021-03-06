function main(args)
*======================================================================================
* Script created by: Bryan Burlingame - (2013-2014)
***************************************************************************************

latmin=subwrd(args,1)
latmax=subwrd(args,2)
lonmin=subwrd(args,3)
lonmax=subwrd(args,4)
model=subwrd(args,5)

'reinit'
'set display color white'
'open /tornado/r1/bmburlin/NCEP/GFS/GFS.ctl'
'set vpage 0 11.0 0 8.5'
'set parea 0.1 10.1 .3 7.9'
'set mpdraw on'
'set mpdset hires'
'set mpt 0 1 1 1'
'set mpt 1 1 1 1'
'set mpt 2 1 1 1'
'set xlab off'
'set ylab off'
'set grid off'
'set mproj scaled'
'set lat 'latmin ' 'latmax
'set lon 'lonmin ' 'lonmax

'q time'
  init = subwrd(result,3)
  inittime = substr(init,1,12)
  initday = substr(init,4,2)
  inithr = substr(init,1,3)
  initmonth = substr(init,6,3)
  inityr = substr(init,9,12)

Clevs="CAPEsfc CAPE180_0mb CAPE255_0mb CAPE180_0mb"
Clev=1
while (Clev<=4)
  cape=subwrd(Clevs,Clev)
  if (Clev=1)
    title="Surface Based"
    imgname=sbcape
  endif
  if (Clev=2)
    title="180mb ML"
    imgname=ml180cape
  endif
  if (Clev=3)
    title="255mb MU"
    imgname=mucape
  endif
  if (Clev=4)
    title="180mb ML CIN &"
    imgname=cape_cin
  endif

  count = 0
  t = 1
  fhr = 0
  inc = 3
  'q file'
    rec=sublin(result,5)
    numbfor=subwrd(rec,12)

  'run colors/colors_cape.gs'

  while (count < numbfor)
    'set t 't
    'q time'
    res = subwrd(result,3)
    Z_temp = substr(res,3,1)

    if (Z_temp = Z )
      vtime = substr(res,1,12)
      vhr = substr(vtime,1,2)
      vmonth = substr(vtime,6,3)
      vday = substr(vtime,4,2)
      vyr = substr(vtime,9,12)
      vmin = 00
    else
      vtime = substr(res,1,15)
      vhr = substr(vtime,1,2)
      vmonth = substr(vtime,9,3)
      vday = substr(vtime,7,2)
      vyr = substr(vtime,12,12)
      vmin = substr(vtime,4,2)
    endif

    'set grads off'
    if (Clev<=3)
      'set clevs 1 50 100 250 500 750 1000 1250 1500 1750 2000 2500 3000 3500 4000 4500 5000 5500 6000 7000 8000 9000'
      'set ccols 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42'
      'set gxout shaded'
      'd 'cape

      'set gxout contour'
      'set ccolor 1'
      'set cthick 4'
      'set cint 4'
      'set clab masked'
      'set clopts -1 4 0.08'
      'd smth9(prmslmsl/100)'
    endif

    if (Clev=4)
      'set rgb 80 tile 81'
      'set tile 81 5 5 5 3 0'
      'set gxout shaded'
      'set clevs 2000'
      'set ccols 0 80'
      'd smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(CAPE180_0mb))))))))))))'

      'set clevs -100 -50 -25 -10 '
      'set ccols 53 52 51 50 49'
      'set gxout shaded'
      'd CIN180_0mb'

      'set clevs 1000 2000 3000 4000 5000 6000'
      'set ccols 43 44 45 46 47 48 48'
      'set gxout contour'
      'set cthick 6'
      'set clopts -1 4 0.08'
      'set clab masked'
      'set csmooth on'
      'd smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(CAPE180_0mb))))))))))))'
    endif

    'set rgb 254   0   3 229 100'
    'set line 254 1 0.01'
    'draw shp /tornado/r1/bmburlin/NCEP/misc/shapefiles/highways/in101503.shp'
    'set line 1 1 1'
    'draw shp /tornado/r1/bmburlin/NCEP/misc/shapefiles/states/dtl_st.shp'

    'run colorbar/xcbar.gs -direction v -fs 1 -fw .1 -fh .12 -line'
    'set strsiz 0.15'
    'set string 1 l 2'
    if (Clev=4)
      'draw string .1 8.25 'title' CAPE (J/kg) - CAPE > 2000 (hatched)'
    else
      'draw string .1 8.25 'title' CAPE (J/kg)'
    endif
    'set strsiz 0.11'
    'draw string .1 8.02 Initialized: 'inithr': 'initmonth' 'initday', 'inityr' -- Forecast Hour ['fhr':00]'
    'set string 1 r 1'
    'set strsiz 0.1'
    'draw string 10.95 8.4 Global Forecast System (GFS) 0.25`ao`n'
    'set strsiz 0.08'
    'draw string 10.95 8.2 Data from NCEP'
    'set strsiz 0.12'
    'set string 1 bl 1'
    'draw string 6.4 0.08 Forecast Valid: 'vhr':'vmin'z: 'vmonth' 'vday', 'vyr
  'set rgb 255 0 0 229'
    'set string 255'
    'set string 255 bl 1'
    'draw string 0.11 0.08 http://derecho.math.uwm.edu/~bmburlin/'
    'gxprint 'fhr'_'imgname'.png x800 y600'
    'clear'
    count = count + 1
    t = t + 1
    fhr = fhr + inc

  endwhile
*  '!mv *'imgname'.png /tstorm/s0/bmburlin/wrf/POST/NCEP/'model'/images/'imgname
  '!mv *'imgname'.png /tornado/r1/bmburlin/public_html/graphics/'model'/'imgname
  Clev=Clev+1
endwhile
'quit'
