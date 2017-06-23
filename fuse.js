const { FuseBox, CSSPlugin, SassPlugin, WebIndexPlugin, Sparky, UglifyJSPlugin } = require("fuse-box")

let fuse, app, vendor, isProduction = false

Sparky.task("config", () => {
  fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
    hash: isProduction,
    sourceMaps: !isProduction,
    plugins: [
      [SassPlugin(), CSSPlugin()],
      CSSPlugin(),
      WebIndexPlugin({ path: '.' }),
      isProduction && UglifyJSPlugin(),
    ],
  })

  vendor = fuse.bundle("vendor")
      .instructions("~ index.ts")

  app = fuse.bundle("app")
      .instructions(`!> [index.ts]`)

  if (!isProduction) {
    fuse.dev({ socketURI: "ws://localhost:3333" })
  }
})

Sparky.task("default", ["config"], () => {
  vendor.hmr().watch()
  app.watch()
  return fuse.run()
})

Sparky.task("dist", ["set-production", "config"], () => {
  return fuse.run()
})

Sparky.task("set-production", () => {
  isProduction = true
  return Sparky.src("dist/").clean("dist/");
})
