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
Ext.namespace('Zarafa.plugins.imapsync.data');

/**
 * @class Zarafa.plugins.imapsync.data.ResponseHandler
 * @extends Zarafa.core.data.AbstractResponseHandler
 *
 * Imapsync plugin specific response handler.
 */
Zarafa.plugins.imapsync.data.ImapsyncResponseHandler = Ext.extend(Zarafa.core.data.AbstractResponseHandler, {

	/**
	 * @cfg {Function} callbackFn The function which will be called after success/failure response.
	 */
	callbackFn : undefined,

	/**
	 * @cfg {Object} scope The function scope that will be used when calling {@link #callbackFn}.
	 */
	scope : undefined,

	/**
	 * In case exception happened on server, server will return exception response with the display message.
	 * @param {Object} response Object contained the response data.
	 */
	doError : function(response)
	{
		var displayMessage = _('An unknown error occurred while syncing IMAP server.');

		if(response.info) {
			displayMessage = response.info.display_message;
		}

		Ext.MessageBox.alert(_('Error'), displayMessage);

		this.callbackFn.apply(this.scope || this, [ false, response ]);
	},

	/**
	 * When imap import is successfully started the server will send a success response including display message.
	 * @param {Object} response Object contained the response data.
	 */
	doSuccess : function(response)
	{
		var displayMessage = _('IMAP server import starting, you will receive an e-mail when done');

		if(response.info) {
			displayMessage = response.info.display_message;
		}

		Ext.MessageBox.alert(_('Success'), displayMessage);

		this.callbackFn.apply(this.scope || this, [ true, response ]);
	}
});
