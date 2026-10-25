$docPath = "E:\Tools\KHKT\HD CONG TAC THI DUA HOC SINH 2026-2027.doc"
$docxPath = "E:\Tools\KHKT\data\HD CONG TAC THI DUA HOC SINH 2026-2027.docx"
$txtPath = "E:\Tools\KHKT\data\HD CONG TAC THI DUA HOC SINH 2026-2027.txt"

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Open($docPath)
    $text = $doc.Content.Text
    [System.IO.File]::WriteAllText($txtPath, $text, [System.Text.Encoding]::UTF8)
    $doc.SaveAs([ref]$docxPath, [ref]16)
    $doc.Close()
    $word.Quit()
    Write-Host "CONVERT_SUCCESS"
} catch {
    Write-Host "COM_ERROR: $($_.Exception.Message)"
}
