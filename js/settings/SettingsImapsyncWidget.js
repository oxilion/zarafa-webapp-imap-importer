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
 * @class Zarafa.plugins.imapsync.settings.SettingsImapsyncWidget
 * @extends Zarafa.settings.ui.SettingsWidget
 * @xtype zarafa.settingsimapsyncwidget
 *
 * The {@link Zarafa.settings.ui.SettingsWidget widget} for syncing with a IMAP server
 * in the {@link Zarafa.plugins.imapsync.settings.SettingsImapsyncCategory imapsync category}.
 */
Zarafa.plugins.imapsync.settings.SettingsImapsyncWidget = Ext.extend(Zarafa.settings.ui.SettingsWidget, {

	/**
	 * @constructor
	 * @param {Object} config Configuration object
	 */
	constructor : function(config)
	{
		config = config || {};

		Ext.applyIf(config, {
			height : 175,
			width : 400,
			title : _('Import IMAP'),
			xtype : 'zarafa.settingsimapsyncwidget',
			layout : {
				// override from SettingsWidget
				type : 'fit'
			},
			items : [{
				xtype : 'zarafa.imapsyncpanel',
				ref : 'imapsyncPanel',
				listeners : {
					syncimap : this.setModelDirty,
					scope : this
				}
			}]
		});

		Zarafa.plugins.imapsync.settings.SettingsImapsyncWidget.superclass.constructor.call(this, config);
	},

	/**
	 * initialize events for the {@link Zarafa.plugins.imapsync.settings.SettingsImapsyncWidget SettingsImapsyncWidget}.
	 * @private
	 */
	initEvents : function()
	{
		Zarafa.plugins.imapsync.settings.SettingsImapsyncWidget.superclass.initEvents.call(this);

		// listen to savesettings and discardsettings to save/discard delegation data
		var contextModel = this.settingsContext.getModel();

		var imap_server = this.get('server');
		var imap_username = this.get('username');
		var imap_password = this.get('password');
		container.getSettingsModel().set('zarafa/v1/plugins/imapsync/server', '');

		this.mon(contextModel, 'savesettings', this.onSaveSettings, this);
		this.mon(contextModel, 'discardsettings', this.onDiscardSettings, this);
	},

	/**
	 * Event handler will be called when {@link Zarafa.settings.SettingsContextModel#savesettings} event is fired.
	 * This will relay this event to {@link Zarafa.plugins.imapsync.settings.ImapsyncPanel ImapsyncPanel} so it can
	 * save data.
	 * @private
	 */
	onSaveSettings : function()
	{
		// only save when this category is visible on screen
		if(this.ownerCt.isVisible()) {
			//this.ownerCt.displaySavingMask();

			var data = this.imapsyncPanel.getForm().getFieldValues();

			// send request
			container.getRequest().singleRequest('imapsyncmodule', 'save', data, new Zarafa.plugins.imapsync.data.ImapsyncResponseHandler({
				callbackFn : function(success, response) {
					this.ownerCt.hideSavingMask(success);
				},
				scope : this
			}));

		}
	},

	/**
	 * Event handler will be called when {@link Zarafa.settings.SettingsContextModel#discardsettings} event is fired.
	 * This will relay this event to {@link Zarafa.plugins.imapsync.settings.ImapsyncPanel ImapsyncPanel} so it can
	 * discard current changes.
	 * @private
	 */
	onDiscardSettings : function()
	{
		this.imapsyncPanel.getForm().reset();
	},

	/**
	 * Function will be called when any field in {@link Zarafa.plugins.imapsync.settings.ImapsyncPanel}
	 * is changed and we need to mark settings model as dirty.
	 * @private
	 */
	setModelDirty : function()
	{
		var model = this.settingsContext.getModel();

		if(!model.hasChanges()) {
			model.setDirty();
		}
	}
});

Ext.reg('zarafa.settingsimapsyncwidget', Zarafa.plugins.imapsync.settings.SettingsImapsyncWidget);
