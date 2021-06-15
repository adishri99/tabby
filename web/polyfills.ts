import * as angularCoreModule from '@angular/core'
import * as angularCompilerModule from '@angular/compiler'
import * as angularCommonModule from '@angular/common'
import * as angularFormsModule from '@angular/forms'
import * as angularPlatformBrowserModule from '@angular/platform-browser'
import * as angularPlatformBrowserAnimationsModule from '@angular/platform-browser/animations'
import * as angularPlatformBrowserDynamicModule from '@angular/platform-browser-dynamic'
import * as angularAnimationsModule from '@angular/animations'
import * as ngBootstrapModule from '@ng-bootstrap/ng-bootstrap'
import * as ngxToastrModule from 'ngx-toastr'

import { Buffer } from 'buffer'
import { base64Slice, latin1Slice, utf8Slice, utf8Write } from './polyfills.buffer'


window['Buffer'] = Buffer

Buffer.prototype['latin1Slice'] = latin1Slice
Buffer.prototype['utf8Slice'] = utf8Slice
Buffer.prototype['base64Slice'] = base64Slice
Buffer.prototype['utf8Write'] = utf8Write

const mocks = {
    fs: {
        //     console.warn('mock realPathSync', path)
        //     return path
        // },
        // existsSync: path => {
        //     console.warn('mock existsSync', path)
        //     return false
        // },
        realpathSync: () => null,
        readdir: () => null,
        stat: () => null,
        appendFile: () => null,
        // mkdir: path => {
        //     console.warn('mock mkdir', path)
        // },
        // mkdirSync: path => {
        //     console.warn('mock mkdirSync', path)
        // },
        // writeFileSync: () => null,
        // readFileSync: (path) => {
        //     return ''
        // },
        // readFile: (path, enc, cb) => {
        //     console.warn('mock readFile', path)
        //     cb('UNKNOWN', null)
        // },
        constants: {},
    },
    buffer: {
        Buffer,
    },
    crypto: {
        ...require('crypto-browserify'),
        getHashes () {
            return ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160']
        },
        timingSafeEqual (a, b) {
            return a.equals(b)
        },
    },
    events: require('events'),
    path: require('path-browserify'),
    readline: {
        cursorTo: () => null,
        clearLine: stream => stream.write('\r'),
    },
    zlib: {
        ...require('browserify-zlib'),
        constants: require('browserify-zlib'),
    },
    'any-promise': Promise,
    tls: { },
    module: {
        globalPaths: [],
    },
    assert: require('assert'),
    url: {
        parse: () => null,
    },
    http: {
        Agent: class {},
        request: {},
    },
    https: {
        Agent: class {},
        request: {},
    },
    querystring: {},
    tty: { isatty: () => false },
    child_process: {},
    'readable-stream': {},
    os: {
        platform: () => 'web',
        homedir: () => '/home',
    },
    constants: require('constants-browserify'),
    'hterm-umdjs': {
        hterm: {
            PreferenceManager: class { set () {} },
            VT: {
                ESC: {},
                CSI: {},
                OSC: {},
            },
            Terminal: class {},
            Keyboard: class {},
        },
        lib: {
            wc: {},
            Storage: {
                Memory: class {},
            },
        },
    },
    dns: {},
    util: require('util/'),
    keytar: {
        getPassword: () => null,
    },
}

const builtins = {
    '@angular/core': angularCoreModule,
    '@angular/compiler': angularCompilerModule,
    '@angular/common': angularCommonModule,
    '@angular/forms': angularFormsModule,
    '@angular/platform-browser': angularPlatformBrowserModule,
    '@angular/platform-browser/animations': angularPlatformBrowserAnimationsModule,
    '@angular/platform-browser-dynamic': angularPlatformBrowserDynamicModule,
    '@angular/animations': angularAnimationsModule,
    '@ng-bootstrap/ng-bootstrap': ngBootstrapModule,
    'ngx-toastr': ngxToastrModule,
    deepmerge: require('deepmerge'),
    rxjs: require('rxjs'),
    'rxjs/operators': require('rxjs/operators'),
    'js-yaml': require('js-yaml'),
    'zone.js/dist/zone.js': require('zone.js/dist/zone.js'),
}

const originalRequire = window['require']
const mockRequire = path => {
    if (mocks[path]) {
        console.warn('requiring mock', path)
        return mocks[path]
    }
    if (builtins[path]) {
        return builtins[path]
    }
    return originalRequire(path)
}

mockRequire['resolve'] = (() => null) as any

Object.assign(window, {
    require: mockRequire,
})

window['require'].main = {
    paths: [],
} as any

window['module'] = {
    paths: [],
} as any

window['__dirname'] = '__dirname'
window['setImmediate'] = setTimeout as any
mocks.module['prototype'] = { require: window['require'] }
mocks.assert.assertNotStrictEqual = () => true
mocks.assert.notStrictEqual = () => true

// Late mocks and builtins

builtins['ssh2'] = require('ssh2')
builtins['ssh2/lib/protocol/constants'] = require('ssh2/lib/protocol/constants')
builtins['stream'] = require('stream-browserify')
