/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('td.Application', {
    extend: 'Ext.app.Application',
    
    name: 'td',

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application

    },

    onAppUpdate: function () {
        Ext.Msg.confirm('업데이트 알림', '업데이트된 내용이 있습니다, 새로고침할까요?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
