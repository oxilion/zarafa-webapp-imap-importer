<?php
/*    Copyright 2014 Oxilion B.V.
 *
 *    This file is part of Zarafa WebApp IMAP Importer
 *
 *    Zarafa WebApp IMAP Importer is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Affero General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    Zarafa WebApp IMAP Importer is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with Zarafa WebApp IMAP Importer.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Imapsync module.
 * Module that will be used to sync a IMAP server
 */
class ImapsyncModule extends Module
{
	/**
	 * Process the incoming events that were fire by the client.
	 */
	public function execute()
	{
		foreach($this->data as $actionType => $actionData)
		{
			if(isset($actionType)) {
				try {
					switch($actionType)
					{
						case 'save':
							$this->save($actionData);
							break;
						default:
							$this->handleUnknownActionType($actionType);
					}
				} catch (MAPIException $e) {
					$this->sendFeedback(false, $this->errorDetailsFromException($e));
				}

			}
		}
	}

	/**
	 * Sync IMAP after user presses applies when added the IMAP data.
	 * @param {Array} $data data sent by client.
	 */
	public function save($data)
	{
		$errorMessage = '';

		// some sanity checks
		if(empty($data)) {
			$errorMessage = _('No data received.');
		}

		if(empty($data['imap_server'])) {
			$errorMessage = _('No IMAP server given.');
		}

		if(empty($data['imap_username'])) {
			$errorMessage = _('IMAP username is empty.');
		}

		if(empty($data['imap_password'])) {
			$errorMessage = _('IMAP password is empty.');
		}

		if(empty($errorMessage)) {
				$this->saveInDB($data);
		} else {
			$this->sendFeedback(false, array(
				'type' => ERROR_ZARAFA,
				'info' => array(
					'display_message' => $errorMessage
				)
			));
		}
	}


	/**
	 * Function will execute zarafa-imapsync command and will try to change user's IMAP data,
	 * this method is unsecure and unreliable.
	 * @param {Array} $data data sent by client.
	 */
	public function saveInDB($data)
	{
		$errorMessage = '';

		// Do the sync!
		$source = array(
			'host' => $data['imap_server'],
			'user' => $data['imap_username'],
			'password' => $data['imap_password'],
			'encryption' => $data['imap_encryption'],
		);

		$email = $GLOBALS["mapisession"]->getSMTPAddress();

		$destination = array(
			'host' => PLUGIN_IMAPSYNC_ZARAFA_IMAP_SERVER,
			'user' => $_SESSION['username'],
			'encryption' => PLUGIN_IMAPSYNC_ZARAFA_IMAP_ENCRYPTION,
		);

		$password = $_SESSION['password'];

		if(function_exists("openssl_decrypt")) {
			// In PHP 5.3.3 the iv parameter was added
			if(version_compare(phpversion(), "5.3.3", "<")) {
				$password = openssl_decrypt($password,"des-ede3-cbc",PASSWORD_KEY,0);
			} else {
				$password = openssl_decrypt($password,"des-ede3-cbc",PASSWORD_KEY,0,PASSWORD_IV);
			}
		}

		$destination['password'] = $password;

		$options = array(
			'feedback_from_email' => PLUGIN_IMAPSYNC_ZARAFA_FEEDBACK_FROM,
			'feedback_to_email' => $email,
		);

		$c = new Celery('localhost', 'guest', 'guest', '/');
		$task = $c->PostTask('tasks.imapsync', array($source, $destination, $options));

		// send feedback to client
		$this->sendFeedback(true, array(
				'info' => array(
				'display_message' => _('IMAP server sync is starting. The status email will be send after the process is finished. (This depends on the amount of emails that have to be synced.)')
			)
		));

		if(!empty($errorMessage)) {
			$this->sendFeedback(false, array(
				'type' => ERROR_ZARAFA,
				'info' => array(
					'display_message' => $errorMessage
				)
			));
		}
	}

}
?>
