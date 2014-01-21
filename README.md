zarafa-webapp-imap-import
====================

The Webapp IMAP Importer plugin allows the user to import an IMAP account to his Zarafa account directly in WebApp.

## How to install
1. Make sure amqp php extention is installed (`yum -y install php-pecl-amqp` on EL6 systems) or php-bcmath is installed (`yum -y install php-bcmath` on EL6 systems)
2. Download zip from https://community.zarafa.com/pg/plugins/project/23465/developer/oxilion/webapp-imap-importer
3. Unpack downloaded zip to <webapp_path>/plugins directory
4. Give read permissions to apache for <webapp_path>/plugins/imapsync directory
5. Change config.php to suit your environment
6. If you want to enable this plugin by default for all users then edit config.php file and change PLUGIN_IMAPSYNC_USER_DEFAULT_ENABLE setting to true

## How to enable
1. Go to settings section
2. Go to Plugins tab
3. Enable IMAP Importer plugin and reload webapp

## How to use
1. Go to Import IMAP tab of settings section
2. Provide IMAP account settings of the account you want to import
3. Click on apply

## How to disable
1. Go to settings section
2. Go to Plugins tab
3. Disable IMAP Importer plugin and reload webapp

## Notes
- Feedback/Bug Reports are welcome

## Todo
- Better feedback
- Easier installation (packages etc.)
- Support backend/frontend on different servers
