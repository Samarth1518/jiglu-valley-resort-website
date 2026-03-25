Add-Type -AssemblyName System.Drawing

function Create-PlaceholderImage {
    param(
        [string]$path,
        [int]$width,
        [int]$height,
        [System.Drawing.Color]$bgColor,
        [System.Drawing.Color]$textColor,
        [string]$label
    )

    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    # Fill background
    $brush = New-Object System.Drawing.SolidBrush($bgColor)
    $g.FillRectangle($brush, 0, 0, $width, $height)
    $brush.Dispose()

    # Draw subtle grid lines
    $gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(20, 255, 255, 255), 1)
    for ($x = 0; $x -lt $width; $x += 80) { $g.DrawLine($gridPen, $x, 0, $x, $height) }
    for ($y = 0; $y -lt $height; $y += 80) { $g.DrawLine($gridPen, 0, $y, $width, $y) }
    $gridPen.Dispose()

    # Draw a decorative circle in center
    $circleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 255, 255, 255))
    $cx = $width / 2
    $cy = $height / 2
    $g.FillEllipse($circleBrush, $cx - 80, $cy - 80, 160, 160)
    $circleBrush.Dispose()

    # Draw label text
    $font = New-Object System.Drawing.Font("Arial", 20, [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush($textColor)
    $strFormat = New-Object System.Drawing.StringFormat
    $strFormat.Alignment = [System.Drawing.StringAlignment]::Center
    $strFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
    $rect = New-Object System.Drawing.RectangleF(0, 0, $width, $height)
    $g.DrawString($label, $font, $textBrush, $rect, $strFormat)

    # Save
    $g.Dispose()
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
    Write-Host "Created: $path"
}

$dir = "C:\Users\SAMARTH\.gemini\antigravity\scratch\resort-website\images"

Create-PlaceholderImage "$dir\gallery6.jpg" 1200 800 `
    ([System.Drawing.Color]::FromArgb(20, 110, 120)) `
    ([System.Drawing.Color]::White) `
    "Gallery - Resort Pool & Lounge"

Create-PlaceholderImage "$dir\activity1.jpg" 800 600 `
    ([System.Drawing.Color]::FromArgb(30, 80, 160)) `
    ([System.Drawing.Color]::White) `
    "Swimming Pool Activity"

Create-PlaceholderImage "$dir\activity2.jpg" 800 600 `
    ([System.Drawing.Color]::FromArgb(100, 65, 30)) `
    ([System.Drawing.Color]::White) `
    "Archery Activity"

Create-PlaceholderImage "$dir\activity4.jpg" 800 600 `
    ([System.Drawing.Color]::FromArgb(160, 110, 20)) `
    ([System.Drawing.Color]::White) `
    "Board Games"

Create-PlaceholderImage "$dir\activity5.jpg" 800 600 `
    ([System.Drawing.Color]::FromArgb(30, 120, 60)) `
    ([System.Drawing.Color]::White) `
    "Riverside Volleyball"

Write-Host "Done! All placeholder images created."
