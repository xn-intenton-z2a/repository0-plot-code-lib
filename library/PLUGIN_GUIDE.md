# PLUGIN_GUIDE

## Crawl Summary
Defines plugin object: id:string, defaults:Object, hook functions. Register globally via Chart.register(plugin:Plugin):void or inline per-chart in plugins config. Plugin id constraints: lowercase, URL safe, follow npm naming. Options under options.plugins.<id> with nested properties. Disable plugin per-chart with options.plugins.<id>=false or disable all with options.plugins=false. Default values via plugin.defaults. Lifecycle hooks list with signatures and cancellation behavior. Typescript typing via declaration merging of PluginOptionsByType interface.

## Normalised Extract
Table of Contents
1 Plugin Object Definition
2 Registration Methods
3 Configuration Options Path
4 Disabling Plugins
5 Default Values
6 Lifecycle Hook Signatures
7 Typescript Declarations

1 Plugin Object Definition
id: string unique identifier matching npm package name rules
defaults: Object with keys and default values
hook methods: beforeInit(chart: Chart, args: any, options: any): void  and similar for update, layout, render, draw, event, destroy hooks

2 Registration Methods
Global registration: Chart.register(plugin: Plugin): void
Inline registration: pass plugin in Chart constructor plugins array; inline plugins not globally registered

3 Configuration Options Path
Plugin options under chart.config.options.plugins.<plugin-id> as an object of key: value pairs; default empty object

4 Disabling Plugins
Per-plugin disable: set chart.config.options.plugins.<plugin-id> = false
Disable all plugins: set chart.config.options.plugins = false

5 Default Values
plugin.defaults property used to define default option values applied unless overridden in chart.options.plugins.<plugin-id>.<option>

6 Lifecycle Hook Signatures
beforeInit(chart: Chart, args: {initial: boolean}, options: any): boolean|void
afterInit(chart: Chart, args: any, options: any): void
beforeUpdate(chart: Chart, args: {mode?: string}, options: any): boolean|void
afterUpdate(chart: Chart, args: any, options: any): void
beforeLayout(chart: Chart, args: any, options: any): boolean|void
afterLayout(chart: Chart, args: any, options: any): void
beforeRender(chart: Chart, args: any, options: any): boolean|void
afterRender(chart: Chart, args: any, options: any): void
beforeDraw(chart: Chart, args: any, options: any): boolean|void
afterDraw(chart: Chart, args: any, options: any): void
beforeEvent(chart: Chart, args: {event: Event}, options: any): boolean|void
afterEvent(chart: Chart, args: {event: Event, changed: boolean}, options: any): void
afterDestroy(chart: Chart, args: any, options: any): void

7 Typescript Declarations
Add to a .d.ts file:
declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    <pluginId>?: { <optionKey>?: <optionType> }
  }
}

## Supplementary Details
Plugin ID constraints: cannot start with dot or underscore, no uppercase letters, only URL-safe characters, recommended prefix chartjs-plugin- for public plugins. Chart.register signature: static register(...items: ChartComponentLike[]): void. Chart.unregister(...items: ChartComponentLike[]): void. options.plugins type: false| Record<string, any>. plugin.defaults applies to options.plugins.<id>.<key>. Cancellation: returning false from before* hooks stops default processing. Event hook: args.changed boolean indicates need to re-render. Destroy hook deprecated in v3.7.0 replaced by afterDestroy. Inline plugin warning: cannot register inline plugin globally. TypeScript augmentation: merge PluginOptionsByType to include new plugin options for specific chart types.

## Reference Details
API Specifications:
Chart.register(...items: ChartComponentLike[]): void  // register plugins or components globally
Chart.unregister(...items: ChartComponentLike[]): void  // unregister globally
// Chart constructor signature:
new Chart(ctx: CanvasRenderingContext2D|HTMLCanvasElement|{canvas:HTMLCanvasElement}|ArrayLike<CanvasRenderingContext2D|HTMLCanvasElement>, config: {type: string, data: any, options?: {plugins?: false|Record<string,any>}})

Plugin Object Structure:
interface Plugin<TOptions = any> {
  id: string  // unique plugin ID
  defaults?: TOptions  // default option values
  beforeInit?(chart: Chart, args: {initial: boolean}, options: TOptions): boolean|void
  afterInit?(chart: Chart, args: any, options: TOptions): void
  beforeUpdate?(chart: Chart, args: {mode?: string}, options: TOptions): boolean|void
  afterUpdate?(chart: Chart, args: any, options: TOptions): void
  beforeLayout?(chart: Chart, args: any, options: TOptions): boolean|void
  afterLayout?(chart: Chart, args: any, options: TOptions): void
  beforeRender?(chart: Chart, args: any, options: TOptions): boolean|void
  afterRender?(chart: Chart, args: any, options: TOptions): void
  beforeDraw?(chart: Chart, args: any, options: TOptions): boolean|void
  afterDraw?(chart: Chart, args: any, options: TOptions): void
  beforeEvent?(chart: Chart, args: {event: Event}, options: TOptions): boolean|void
  afterEvent?(chart: Chart, args: {event: Event, changed: boolean}, options: TOptions): void
  afterDestroy?(chart: Chart, args: any, options: TOptions): void
}

Configuration Options:
chart.config.options.plugins = false  // disable all plugins
chart.config.options.plugins['plugin-id'] = false  // disable specific plugin
chart.config.options.plugins['plugin-id'] = { key1: value1, key2: value2 }

Best Practices:
Define plugin.id following npm conventions to avoid collisions.
Use Chart.register for global plugins before creating chart instances.
Provide plugin.defaults for user-configurable options with sensible defaults.
Return false from before* hook to cancel default behavior when needed.
Use args.changed = true in afterEvent to trigger new render when event changes state.

Implementation Example:
import {Chart, Plugin} from 'chart.js';

const backgroundPlugin: Plugin<{color: string}> = {
  id: 'custom_canvas_background_color',
  defaults: {color: 'lightGreen'},
  beforeDraw(chart,args,options) {
    const ctx = chart.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color;
    ctx.fillRect(0,0,chart.width,chart.height);
    ctx.restore();
  }
};

Chart.register(backgroundPlugin);

const chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    plugins: {
      custom_canvas_background_color: {color: 'pink'}
    }
  }
});

Troubleshooting:
Command: console.log(Chart.registry.getPlugin('custom_canvas_background_color'))
Expected: plugin object with id and defaults.
If undefined, ensure Chart.register(backgroundPlugin) ran before chart creation.
Check plugin.id for invalid characters via:
console.assert(/^[a-z0-9\-]+$/.test(plugin.id), 'Invalid plugin id');

## Information Dense Extract
plugin.id:string; plugin.defaults:Object; hook methods beforeInit(chart:Chart,args,options):boolean|void; afterDestroy(chart,args,options):void; register globally: Chart.register(...items:ChartComponentLike[]):void; unregister: Chart.unregister(...items):void; Chart constructor: new Chart(ctx,config(type,data,options.plugins?:false|Record<string,any>)); options.plugins.<id>:Object|false disables specific plugin; options.plugins:false disables all; id constraints: lowercase, url-safe, no leading . or _; default via plugin.defaults applied to options.plugins.<id>.<key>; returning false from before* cancels default; args.changed in afterEvent triggers re-render; TS declaration merging: extend PluginOptionsByType<TType> with plugin option interface.

## Sanitised Extract
Table of Contents
1 Plugin Object Definition
2 Registration Methods
3 Configuration Options Path
4 Disabling Plugins
5 Default Values
6 Lifecycle Hook Signatures
7 Typescript Declarations

1 Plugin Object Definition
id: string unique identifier matching npm package name rules
defaults: Object with keys and default values
hook methods: beforeInit(chart: Chart, args: any, options: any): void  and similar for update, layout, render, draw, event, destroy hooks

2 Registration Methods
Global registration: Chart.register(plugin: Plugin): void
Inline registration: pass plugin in Chart constructor plugins array; inline plugins not globally registered

3 Configuration Options Path
Plugin options under chart.config.options.plugins.<plugin-id> as an object of key: value pairs; default empty object

4 Disabling Plugins
Per-plugin disable: set chart.config.options.plugins.<plugin-id> = false
Disable all plugins: set chart.config.options.plugins = false

5 Default Values
plugin.defaults property used to define default option values applied unless overridden in chart.options.plugins.<plugin-id>.<option>

6 Lifecycle Hook Signatures
beforeInit(chart: Chart, args: {initial: boolean}, options: any): boolean|void
afterInit(chart: Chart, args: any, options: any): void
beforeUpdate(chart: Chart, args: {mode?: string}, options: any): boolean|void
afterUpdate(chart: Chart, args: any, options: any): void
beforeLayout(chart: Chart, args: any, options: any): boolean|void
afterLayout(chart: Chart, args: any, options: any): void
beforeRender(chart: Chart, args: any, options: any): boolean|void
afterRender(chart: Chart, args: any, options: any): void
beforeDraw(chart: Chart, args: any, options: any): boolean|void
afterDraw(chart: Chart, args: any, options: any): void
beforeEvent(chart: Chart, args: {event: Event}, options: any): boolean|void
afterEvent(chart: Chart, args: {event: Event, changed: boolean}, options: any): void
afterDestroy(chart: Chart, args: any, options: any): void

7 Typescript Declarations
Add to a .d.ts file:
declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    <pluginId>?: { <optionKey>?: <optionType> }
  }
}

## Original Source
Chart.js Plugin Developer Guide
https://www.chartjs.org/docs/latest/developers/plugins.html

## Digest of PLUGIN_GUIDE

# Plugins
Crawled from https://www.chartjs.org/docs/latest/developers/plugins.html  Data Size: 606912 bytes  Retrieved: 2024-06-09

# Using plugins
Plugins can be shared between chart instances by passing the plugin object to the Chart constructor:

const plugin = {
  id: 'custom_plugin',
  beforeInit: function(chart, args, options) {
    // plugin setup
  }
};
const chart1 = new Chart(ctx, {plugins:[plugin]});
const chart2 = new Chart(ctx, {plugins:[plugin]});

Inline plugins (not registered globally):
const chart3 = new Chart(ctx, {plugins:[{beforeInit(chart,args,options){ /*...*/ }}]});

# Global plugins
Register plugin globally to apply to all charts:
Chart.register({
  id: 'global_plugin',
  beforeDraw: function(chart,args,options){ /*...*/ }
});

# Plugin ID and Options
Every plugin must define a unique id:
- Cannot start with . or _
- Must be lowercase URL safe (no spaces or uppercase)
- Should follow npm package convention: chartjs-plugin-<name>

Plugin options live under options.plugins.<plugin-id>:
const chart = new Chart(ctx, {
  options: {
    plugins: {
      p1: { foo: 10, bar: true },
      p2: { baz: 'value' }
    }
  }
});

# Disabling plugins
Disable a specific global plugin for one chart:
Chart.register({id: 'p1', /*...*/});
const chart = new Chart(ctx, {options:{plugins:{p1:false}}});

Disable all plugins for a chart:
const chart = new Chart(ctx, {options:{plugins:false}});

# Plugin defaults
Set default option values in plugin.defaults:
const plugin = {
  id: 'custom_canvas_background_color',
  defaults: { color: 'lightGreen' },
  beforeDraw: (chart,args,options)=>{/*...*/}
};

# Plugin Core API Hooks
Hooks are called during chart lifecycle events:
- beforeInit(chart,args,options)
- afterInit(chart,args,options)
- beforeUpdate(chart,args,options)
- afterUpdate(chart,args,options)
- beforeLayout(chart,args,options)
- afterLayout(chart,args,options)
- beforeDatasetsUpdate(chart,args,options)
- afterDatasetsUpdate(chart,args,options)
- beforeRender(chart,args,options)
- afterRender(chart,args,options)
- beforeDraw(chart,args,options)
- afterDraw(chart,args,options)
- beforeDatasetsDraw(chart,args,options)
- afterDatasetsDraw(chart,args,options)
- beforeDatasetDraw(chart,args,options)
- afterDatasetDraw(chart,args,options)
- beforeTooltipDraw(chart,args,options)
- afterTooltipDraw(chart,args,options)
- beforeEvent(chart,args,options)
- afterEvent(chart,args,options)
- afterDestroy(chart,args,options)  (destroy hook deprecated since v3.7.0)

If a hook returns false, some before* hooks will cancel the default behavior.

# TypeScript Typings
Provide a .d.ts declaring:
import {ChartType, Plugin} from 'chart.js';
declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    customCanvasBackgroundColor?: { color?: string }
  }
}

Last Updated: 4/15/2025, 1:19:05 PM

## Attribution
- Source: Chart.js Plugin Developer Guide
- URL: https://www.chartjs.org/docs/latest/developers/plugins.html
- License: License: MIT
- Crawl Date: 2025-05-06T12:32:50.223Z
- Data Size: 606912 bytes
- Links Found: 13974

## Retrieved
2025-05-06
