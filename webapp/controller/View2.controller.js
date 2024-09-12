sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageBox'
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("toolquestionnaire.controller.View2", {
        onInit: function () {
            // Initialization logic goes here
        },

        onAccessOptionSelect: function (oEvent) {
            var selectedIndex = oEvent.getParameters().selectedIndex;
            var bwSystemVersionContainer = this.getView().byId("bwSystemVersionContainer");
            var datePickerContainer = this.getView().byId("datePickerContainer");

            // Show/hide additional questions based on the selection
            bwSystemVersionContainer.setVisible(selectedIndex !== 3); // 3 corresponds to "No"
            datePickerContainer.setVisible(selectedIndex === 3); // 3 corresponds to "No"

            // If "No" is selected, you might want to reset the visibility of other controls
            if (selectedIndex === 3) { // 3 corresponds to "No"
                this.getView().byId("bwSystemVersion").setSelectedIndex(-1);
                this.getView().byId("datePicker").setValue("");
            }
        },

        onRadioButtonSelect: function (oEvent) {
            var selectedIndex = oEvent.getParameters().selectedIndex;
            var othersInputContainer = this.getView().byId("othersInputContainer");

            // Show/hide the input field based on the selection of "Others"
            othersInputContainer.setVisible(selectedIndex === 4); // 4 corresponds to "Others"

            // Clear the input field if it's hidden
            if (selectedIndex !== 4) {
                this.getView().byId("othersInput").setValue("");
            }
        },
		handleSubmitPress:function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView3" , {});
		},
        handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response"),
				iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
				sMessage;

			if (sResponse) {
				sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
				MessageToast.show(sMessage);
			}
		},

		handleUploadPress: function() {
			var oFileUploader = this.byId("fileUploader");
			if (!oFileUploader.getValue()) {
				MessageToast.show("Choose a file first");
				return;
			}
			oFileUploader.checkFileReadable().then(function() {
				oFileUploader.upload();
			}, function(error) {
				MessageToast.show("The file cannot be read. It may have changed.");
			}).then(function() {
				oFileUploader.clear();
			});
			
		},

		handleTypeMissmatch: function(oEvent) {
			var aFileTypes = oEvent.getSource().getFileType();
			aFileTypes.map(function(sType) {
				return "*." + sType;
			});
			MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
									" is not supported. Choose one of the following types: " +
									aFileTypes.join(", "));
		},

		handleValueChange: function(oEvent) {
			MessageToast.show("Press 'Upload File' to upload file '" +
									oEvent.getParameter("newValue") + "'");
		},
		handleUploadComplete: function(oEvent) {
            var sResponse = oEvent.getParameter("response"),
                iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
                sMessage;

            if (sResponse) {
                sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                MessageToast.show(sMessage);
            }
        },

    });
});
