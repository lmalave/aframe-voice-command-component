
## Overview

A voice command component for [A-Frame](https://aframe.io).

![](https://storage.googleapis.com/aframe-voice-commands.appspot.com/images/show_hide_menu.png)

The `aframe-voice-command-component` components provide voice commands that you can easily integrate into an aframe scene. 

The voice command can set an attribute of a target element, or can also execute a function on a target Component.

The `dist/aframe-voice-command-component.js` file defines 2 components:

* A `voice-command` component that can be added to any entity to define an action to take based on a voice command
* An `annyang-speech-recognition` component that provides the voice recognition implementation based on the annyang Speech Recognition library:  [https://github.com/TalAter/annyang](https://github.com/TalAter/annyang)

Although this implementation uses annyang for speech recognition, any speech recognition javascript library can be integrated using the same pattern as `annyang-speech-recognition`

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| **command**   | the text of the voice command  | |
| **type**  | "attribute" to change an attribute or "function" to execute a function  | |
| **targetElement**  | the component to execute the function on. | |
| **targetComponent**  | the element that contains the attribute to change or contains the component to execute the function on.   This is optional since by default the target will be entity that the component belongs to.  | |
| **function**  | the name of the function.  For now the function must take no parameters.  | |
| **attribute**  |the attribute to change  | |
| **value**  | "the value to change the attribute to  | |
| **keyCode**  | n optional numeric ASCII code to use as a shortcut (useful for development when quiet is a necessity)  | |

#### Example: setting an attribute on target element

```xml
<a-entity voice-command="command: city; type: attribute; targetElement: #image-360; attribute: src; value: #city;"></a-entity>
```
#### Example: executing a function on target Component

```xml
<a-entity voice-command="command: go; type: function; targetElement: #cursor; targetComponent: teleporter; function: teleport; keyCode: 13"></a-entity>
```

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

To integrate aframe-voice-commands to an aframe scene, the following must be added:

* The `annyang` voice recognition script and the aframe-voice-commands.js script (found in the dist folder)
```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.5.0/annyang.min.js"></script>
    <script src="aframe-voice-commands.js"></script>
```

* An entity with the `annyang-voice-recognition` component
```html
    <a-entity id="annyang" annyang-voice-recognition></a-entity>
```

* One or more entities with the `voice-command` component
```html
<a-entity id="menu"
              voice-command__show="command: show menu; type: attribute; attribute: visible; value: true;"
              voice-command__hide="command: hide menu; type: attribute; attribute: visible; value: false;">
              ...
              ...
</a-entity>
```
Note that multiple instances of the `voice-command` component are allowed on the same entity as shown above.

###### Browser Compatibility

This implementation is currently only compatible with the Google Chrome browser since it is based on that browser's Speech Recognition API. 

This implementation has been tested on Chrome for desktop (Mac OS) and Android, but should also be compatible with the latest Chrome browser on any platform (Windows Desktop, iOS).

#### npm

Install via npm:

```bash
npm install 
```

Then require and use.

```js
require('aframe');
require('aframe-voice-command-component');
```

## Public Demo

Demos are available publicly at:

[https://storage.googleapis.com/aframe-voice-commands.appspot.com/examples/index.html](https://storage.googleapis.com/aframe-voice-commands.appspot.com/examples/index.html)
 
#### Image gallery demo

Say "show menu" to bring up menu

Say "go to cubes", "go to city", or "go to lake" to show any of the 3 images

Say "hide menu" to hide menu

This scene is based on the Image Gallery aframe.io demo:  [https://github.com/aframevr/360-image-gallery-boilerplate](https://github.com/aframevr/360-image-gallery-boilerplate)

#### Teleporter demo

Say "start move" to activate raycaster

Say "go to" to teleport to location of marker (with raycaster activated)

Say "cancel move" to deactivate raycaster

This scene is based on the Hello Metaverse aframe.io demo: [https://aframe.io/examples/showcase/hello-metaverse/](https://aframe.io/examples/showcase/hello-metaverse/)


### Running demos locally

A node.js app is provided here with the Image Gallery and Teleport demos described above. 
 
To run, first execute:  `npm install`

Then execute: `npm start`

The application will then be running on http://localhost:8000 and your default browser should automatically open on this page

