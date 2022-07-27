class CommonUtil {
  static copy(object) {
    return JSON.parse(JSON.stringify(object));
  }

  static uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  }

  static downloadFile(url, mode = '_self') {
    const element = document.createElement('a');
    if (typeof url === 'object') {
      let opt = url;
      Object.entries(opt).forEach(item => {
        element.setAttribute(item[0], item[1]);
      });
    } else {
      element.setAttribute('href', url);
      element.setAttribute('target', mode);
    }
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  static downloadBlob(blob, fileName) {
    let url = window.URL.createObjectURL(blob);
    CommonUtil.downloadFile({
      href: url,
      target: '_self',
      download: fileName
    });
    window.URL.revokeObjectURL(url);
  }
}

export default CommonUtil;
