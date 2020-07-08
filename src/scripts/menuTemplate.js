var menu = [
    {
        label: "File",
        submenu: [
        {
            label: "New",
            accelerator: "CmdOrCtrl+N"
        },
        {
            label: "Open",
            accelerator: "CmdOrCtrl+O"
        },
        {
            label: "Save",
            accelerator: "CmdOrCtrl+S"
        },
        {
            label: "Save As",
            accelerator: "CmdOrCtrl+Shift+S"
        },
        {
            label: "Exit",
            role: 'quit'
        }]
    },
    {
        label: "Edit",
        submenu: [
            {
                "label": "Undo",
                accelerator: "CmdOrCtrl+Z",
                role: "undo"
            },
            {
                "label": "Cut",
                accelerator: "CmdOrCtrl+X",
                role: "cut"
            },
            {
                "label": "Copy",
                accelerator: "CmdOrCtrl+C",
                role: "copy"
            },
            {
                "label": "Paste",
                accelerator: "CmdOrCtrl+V",
                role: "paste"
            },
            {
                "label": "Delete",
                accelerator: "CmdOrCtrl+V",
                role: "delete"
            }
        ]
    },
    {
        label: "Format",
        submenu: [
            {
                label: "Fonts",
            },
            {
                label: "Word Wrap"
            }
        ]
    },
    {
        label: "View",
        submenu: [
            {
                label: "Zoom",
                submenu: [
                    {
                        label : "Zoom In",
                        accelerator: "CmdOrCtrl+numadd",
                        role: "zoomIn"
                    },
                    {
                        label : "Zoom Out",
                        accelerator: "CmdOrCtrl+numsub",
                        role: "zoomOut"
                    },
                    {
                        label : "Reset Zoom",
                        accelerator: "CmdOrCtrl+num0",
                        role: "resetZoom"
                    }
                ]
            },
            {
                label: "Toggle Dev Tools",
                role: 'toggledevtools' 
            }
        ]
    },
    {
        label: "Help",
        submenu: [
            {
                label: "About"
            }
        ]
    }
]

module.exports = menu;