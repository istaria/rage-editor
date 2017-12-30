const editor = ace.edit("editor");
editor.setTheme("ace/theme/darcula");
editor.setFontSize(18);
editor.setShowPrintMargin(false);
editor.getSession().setUseWorker(false);
editor.getSession().setMode("ace/mode/javascript");
editor.$blockScrolling = Infinity;

ace.config.loadModule('ace/ext/tern', () => {
    editor.setOptions({
        /**
         * Either `true` or `false` or to enable with custom options pass object that
         * has options for tern server: http://ternjs.net/doc/manual.html#server_api
         * If `true`, then default options will be used
         */
        enableTern: {
            defs: ['jquery', 'browser', 'ecma5', 'rosebud'],
            //defs: ['ecma5', 'rosebud'],
            //defs: ['rosebud'],
            //defs: ['ecma5', 'rosebud'],
            /* http://ternjs.net/doc/manual.html#plugins */
            plugins: {
                doc_comment: {
                    fullDocs: true
                }
            },
            /**
             * (default is true) If web worker is used for tern server.
             * This is recommended as it offers better performance, but prevents this from working in a local html file due to browser security restrictions
             */
            useWorker: false,
            /* if your editor supports switching between different files (such as tabbed interface) then tern can do this when jump to defnition of function in another file is called, but you must tell tern what to execute in order to jump to the specified file */
            switchToDoc: function (name, start) {
                console.log('switchToDoc called but not defined. name=' + name + '; start=', start);
            },
            /**
             * if passed, this function will be called once ternServer is started.
             * This is needed when useWorker=false because the tern source files are loaded asynchronously before the server is started.
             */
            startedCb: function () {
                //once tern is enabled, it can be accessed via editor.ternServer
                console.log('editor.ternServer:', editor.ternServer);
            }
        },
        /**
         * when using tern, it takes over Ace's built in snippets support.
         * this setting affects all modes when using tern, not just javascript.
         */
        enableSnippets: true,
        /**
         * when using tern, Ace's basic text auto completion is enabled still by deafult.
         * This settings affects all modes when using tern, not just javascript.
         * For javascript mode the basic auto completion will be added to completion results if tern fails to find completions or if you double tab the hotkey for get completion (default is ctrl+space, so hit ctrl+space twice rapidly to include basic text completions in the result)
         */
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
    });
});

const $tabs = $('#tabs');
$tabs.on('click', '.tab:not(.active)', function(){
    $(this).addClass('active').siblings('.active').removeClass('active');
});