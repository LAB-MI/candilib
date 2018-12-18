export const downloadContent = async (response) => {
    const filename = response.headers.get('Content-Disposition').split('=')[1];
    const blob = await response.blob();
    const ret = {
      filename,
      url: URL.createObjectURL(blob),
    };
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.style = 'display: none';
    link.href = ret.url;
    link.download = ret.filename;
    link.click();
    URL.revokeObjectURL(ret.url);
    document.body.removeChild(link);
    return ret;
}
