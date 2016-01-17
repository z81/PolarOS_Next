// TODO: WTF
export default function (key) {
  const scope = `app${key}`

  let chan = Channel.build({
      window: document.querySelector(`iframe[name="${key}"]`).contentWindow,
      origin: "*",
      scope: scope
  });

  chan.bind("title.change", (trans, title) => {
    w.title = title

    this.refs.notify.addNotification({
      message: `Приложения "${w.app.name}" изменило загловок на "${title}"`,
      level: 'success'
    });
  });

  chan.bind("wallpaper.change", (trans, img) => {
    this.props.setWallpaper(img)
    this.refs.notify.addNotification({
      message: `Приложения "${w.app.name}" изменило обои на "${img}"`,
      level: 'success'
    });
  });

  chan.bind("apps.get", (trans, s) => {
    return this.props.userApps;
  });

  chan.bind("wallpapers.get", (trans, s) => {
    return this.props.user.wallpapers;
  });
}
