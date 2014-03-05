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
Ext.namespace('Zarafa.plugins.imapsync.settings');

/**
 * @class Zarafa.plugins.imapsync.settings.ImapsyncPanel
 * @extends Ext.form.FormPanel
 *
 * Panel which holds a form that handles the IMAP server data
 */
Zarafa.plugins.imapsync.settings.ImapsyncPanel = Ext.extend(Ext.form.FormPanel, {

	/**
	 * @constructor
	 * @param {Object} config configuration object that needs to be used when creating this dialog
	 */
	constructor : function(config)
	{
		config = config || {};

		Ext.applyIf(config, {
			xtype : 'zarafa.imapsyncpanel',
			labelWidth : 150,
			defaults : {
				width : 200
			},
			border : false,
			items : [{
				xtype : 'textfield',
				name : 'imap_server',
				fieldLabel : 'IMAP server',
				listeners : {
					change : this.onFieldChange,
					scope : this
				}
			}, {
				xtype : 'textfield',
				name : 'imap_username',
				fieldLabel : 'IMAP username',
				listeners : {
					change : this.onFieldChange,
					scope : this
				}
			}, {
				xtype : 'textfield',
				name : 'imap_password',
				fieldLabel : 'IMAP password',
				listeners : {
					change : this.onFieldChange,
					scope : this
				}
			}, {
				xtype: 'combo',
				hiddenName : 'imap_encryption',
				fieldLabel: 'IMAP encryption',
				renderTo: document.body,
				mode: 'local',
				triggerAction: 'all',
				lastQuery: '',
				store: new Ext.data.SimpleStore({
					data: [
						['tls', 'STARTTLS'],
						['ssl', 'SSL'],
						['none', 'off']
					],
					id: 0,
					fields: ['value', 'text']
				}),
				valueField: 'value',
				displayField: 'text',
				forceSelection: true,
				editable: false,
				listeners : {
					change : this.onFieldChange,
					scope : this
				}
			}]
		});

		this.addEvents(
			/**
			 * @event syncimap
			 * Fires when a field is modified in the form panel
			 */
			'syncimap'
		);

		Zarafa.plugins.imapsync.settings.ImapsyncPanel.superclass.constructor.apply(this, arguments);

		this.on('afterrender', this.initialize, this);
	},

	/**
	 * Function will initialize this dialog with some default values and will
	 * also create object of {@link #saveMask}.
	 */
	initialize : function()
	{

	},

	onSync : function(field, newValue, oldValue)
	{
		this.fireEvent('syncimap', this);
	},

	/**
	 * Handler function will be called when user changes any field in the form.
	 * This will fire custom event on this form to indicate that settings model
	 * should be marked as dirty
	 */
	onFieldChange : function(field, newValue, oldValue)
	{
		this.fireEvent('syncimap', this);
	}
});

Ext.reg('zarafa.imapsyncpanel', Zarafa.plugins.imapsync.settings.ImapsyncPanel);
