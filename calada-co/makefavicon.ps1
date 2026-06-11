Add-Type -AssemblyName System.Drawing

$srcPath = "D:\CalAda_Co\calada-co\public\assets\Business Logos-1.png"
$outPath = "D:\CalAda_Co\calada-co\public\favicon.png"

$src = [System.Drawing.Image]::FromFile($srcPath)

# Crop the center 62% of the image — zooms in on the logo, trims the empty padding
$cropRatio = 0.62
$cw = [int]($src.Width  * $cropRatio)
$ch = [int]($src.Height * $cropRatio)
$cx = [int](($src.Width  - $cw) / 2)
$cy = [int](($src.Height - $ch) / 2)

$bmp = New-Object System.Drawing.Bitmap 512, 512
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

$destRect = New-Object System.Drawing.Rectangle 0, 0, 512, 512
$srcRect  = New-Object System.Drawing.Rectangle $cx, $cy, $cw, $ch
$g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose(); $bmp.Dispose(); $src.Dispose()
Write-Host "favicon.png created at $outPath"
