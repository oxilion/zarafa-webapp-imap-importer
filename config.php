<?php
/** Enable the imapsync plugin for all clients **/
define('PLUGIN_IMAPSYNC_USER_DEFAULT_ENABLE', false);
// IMAP server for users served by this webapp instance
define('PLUGIN_IMAPSYNC_ZARAFA_IMAP_SERVER', 'localhost');
// encryption of zarafa imap server: tls, ssl or off
define('PLUGIN_IMAPSYNC_ZARAFA_IMAP_ENCRYPTION', 'off');
// "from" email-address for sync finished e-mail message
define('PLUGIN_IMAPSYNC_ZARAFA_FEEDBACK_FROM', 'zarafa@example.org');

require_once __DIR__ . '/vendor/autoload.php';
