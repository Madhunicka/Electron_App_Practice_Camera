const {app, BrowserWindow, Menu, shell, ipcMain} = require('electron');
const { type } = require('node:os');
const path = require('node:path')


const menuItems = [
    {
        label: "Menu",
        submenu: [
            {
                label: "About"
            },
        ],
    },
    {
        label: "File",
        submenu: [
            {
                label: "Open Camera",
                click: async ()=>{
                    // await shell.openExternal('https://bitfumes.com');
                    const win2 = new BrowserWindow({
                        height:500,
                        width: 800,
                        show: false,
                        webPreferences: {
                            preload: path.join(__dirname, 'cameraPreload.js')
                          }

                    });
                    ipcMain.on('close-window2', ()=>{
                        win2.close();
                    })
                    win2.webContents.openDevTools();

                    win2.loadFile('camera.html');
                    // win2.loadURL('https://bitfumes.com');
                    win2.once('ready-to-show', ()=>{
                        win2.show();
                    })


                }
            },
            {
                label: "Learn More",
                click: async ()=>{
                    await shell.openExternal('https://bitfumes.com');

                }
            },
            {
                type: "separator",
            },
            {
                label: "Exit",
                click: () => {
                    app.quit();
                },
            },
        ],
    },
    {
        label: "Window",
        submenu: [
            {
                role: "Minimize",
            },
            {
                role: "close",
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const creteWindow = () => {
    const win = new BrowserWindow({
        height:500,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
    });
    ipcMain.on('set-image', (event, data)=>{
        win.webContents.send('get-image', data);
    })
   
    win.webContents.openDevTools();
    win.loadFile('index.html');
}

app.whenReady().then(()=>{
    creteWindow();

   
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
})