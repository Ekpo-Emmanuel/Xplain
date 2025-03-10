declare namespace chrome {
  namespace runtime {
    function sendMessage(
      message: any,
      callback?: (response: any) => void
    ): void;
    
    const onMessage: {
      addListener(
        callback: (
          message: any,
          sender: any,
          sendResponse: (response?: any) => void
        ) => boolean | void
      ): void;
    };
  }
  
  namespace tabs {
    function query(
      queryInfo: {
        active: boolean;
        currentWindow: boolean;
      },
      callback: (tabs: chrome.tabs.Tab[]) => void
    ): void;
    
    function sendMessage(
      tabId: number,
      message: any,
      callback?: (response: any) => void
    ): void;
    
    function create(
      createProperties: {
        url: string;
      },
      callback?: (tab: chrome.tabs.Tab) => void
    ): void;
    
    interface Tab {
      id?: number;
      url?: string;
      title?: string;
    }
  }
  
  namespace contextMenus {
    function create(
      createProperties: {
        id: string;
        title: string;
        contexts: string[];
      },
      callback?: () => void
    ): void;
    
    const onClicked: {
      addListener(
        callback: (
          info: {
            menuItemId: string;
            selectionText?: string;
          },
          tab: chrome.tabs.Tab
        ) => void
      ): void;
    };
  }
  
  namespace storage {
    interface StorageArea {
      get(
        keys: string | string[] | null,
        callback: (items: { [key: string]: any }) => void
      ): void;
      
      set(
        items: { [key: string]: any },
        callback?: () => void
      ): void;
      
      remove(
        keys: string | string[],
        callback?: () => void
      ): void;
    }
    
    const sync: StorageArea;
    const local: StorageArea;
  }
}