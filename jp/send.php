<?PHP



ini_set('SMTP', 'web17.websitesource.net ');
$to = "chris@95inhouse.com";
$subject = "info". $_REQUEST['theSubject'];


$message = "Name: " . $_REQUEST['theName'];
$message .= "\nEmail: " . $_REQUEST['theEmail'];
$message .= "\n\nMessage: " . $_REQUEST['theMessage'];
$message .= "\n\n\nAddress: " . $_REQUEST['theAdd'];
$message .= "\n\n\n\nTel: " . $_REQUEST['theTel'];
$headers = "From: ".$_REQUEST['theEmail'];
$headers .= "\nReply-To: ".$_REQUEST['theEmail'];

$sentOk = mail($to,$subject,$message,$headers);

echo "sentOk=" . $sentOk;

?>
