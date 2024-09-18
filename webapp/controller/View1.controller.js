sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("toolquestionnaire.controller.View1", {
        onInit: function () {
            // Initialization logic goes here
        },
// sam
        onValueHelpRequest: function() {
            // The logic here is modified to only toggle the input type without changing the icon
            var oEmailInput = this.getView().byId("email");

            // Toggle the type of the input field between "Text" and "Password"
            if (oEmailInput.getType() === "Text") {
                oEmailInput.setType("Password");
            } else {
                oEmailInput.setType("Text");
            }
        },
        
        onPasswordValueHelpRequest : function(oEvent) {
            var oInput = this.getView().byId("password");
            var oIcon = oEvent.getSource();
            
            if (oInput.getType() === "Password") {
            oInput.setType("Text");
            oInput.setValueHelpIconSrc("sap-icon://show");
            } else {
            oInput.setType("Password");
            oInput.setValueHelpIconSrc("sap-icon://hide");
            }
        },

        Onclick: function() {
            // Logic to be executed when the SUBMIT button is pressed
            var enteredEmail = this.getView().byId("email").getValue();
            var enteredPassword = this.getView().byId("password").getValue();

            // Hardcoded values for email and password
            var predefinedEmail = "nat23@gmail.com";
            var predefinedPassword = "Nat";

            // Example validation: Check if the entered email and password match the hardcoded values
            if (enteredEmail.toLowerCase() === predefinedEmail && enteredPassword === predefinedPassword) {
                // Navigate to another page if the credentials are correct
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView2", {});
            } else {
                // Display an error message if the credentials are incorrect
                MessageBox.error("Invalid email or password. Please try again.");
            }
        }
    });
});
