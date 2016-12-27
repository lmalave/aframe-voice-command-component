(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../index.js');

},{"../index.js":2}],2:[function(require,module,exports){
/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerSystem('voice-command', {
    init: function () {
        console.log("in voice-command system init");
        this.entities = [];
        window.addEventListener('loaded', this.onSceneLoaded.bind(this));
    },
    registerMe: function (comp) {
        this.entities.push(comp);
        console.log("in register, comp: "+comp.data.command);
    },
    unregisterMe: function (comp) {
        var index = this.entities.indexOf(comp);
        this.entities.splice(index, 1);
    },
    onSceneLoaded: function(evt) {
        console.log("in voice-command system onSceneLoaded listener");
    },
    play: function() {
        console.log("in system play, entities: "+this.entities);
    }
});
AFRAME.registerComponent('voice-command', {
    multiple: true,
    schema: {
        command: { type: 'string' },
        type: { type: 'string' },
        targetElement: { type: 'selector' },
        targetComponent: { type: 'string' },
        function: { type: 'string' },
        attribute: { type: 'string' },
        value: { type: 'string' },
        keyCode: { type: 'string' }
    },
    init: function () {
        this.system.registerMe(this);
        if (!this.data.targetElement) {
            this.data.targetElement = this.el;
        }
        if (this.data.keyCode) {
            window.addEventListener('keyup', this.onKeyup.bind(this));
        }
    },
    remove: function () {
        this.system.unregisterMe(this);
    },
    play: function() {
        console.log("in voice-command play, command: "+this.data.command+", type: "+this.data.type);
    },
    executeCommand: function () {
        console.log("in executeCommand for: "+this.data.targetElement);
        var targetElement = this.data.targetElement;
        if (this.data.type == 'attribute') {
            console.log("about to change attribute "+this.data.attribute+" to: "+this.data.value);
            targetElement.setAttribute(this.data.attribute, this.data.value);
        } else if (this.data.type == 'function') {
            //console("targetElement: "+targetElement+", components"+targetElement.components);
            var targetComponent = targetElement.components[this.data.targetComponent];
            targetComponent[this.data.function]();
        }
    },
    onKeyup: function (evt) {
        if (evt.keyCode == this.data.keyCode) {
            console.log("in voice command keyup for: "+this.data.command);
            this.executeCommand();
        }
    }
});
AFRAME.registerComponent('annyang-voice-recognition', {
    init: function () {
        console.log("in annyang-voice-recognition init");
    },
    play: function() {
        if (annyang) {
            console.log("annyang: "+annyang);
            console.log("annyang.addCommands: "+annyang.addCommands);
            var voiceCommandSystem = document.querySelector('a-scene').systems['voice-command'];
            var commands = {};
            var commandsMap = {};
            for (var i = 0; i < voiceCommandSystem.entities.length; i++) {
                var voiceCommand = voiceCommandSystem.entities[i];
                commandsMap[voiceCommand.data.command] = voiceCommand;
                // note: function empty here because real work is done in the resultMatch callback below
                commands[voiceCommand.data.command] = function() { };
            }
            annyang.addCommands(commands);

            annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
                console.log("commandText: "+commandText); // sample output: 'hello (there)'
                var voiceCommand = commandsMap[commandText];
                voiceCommand.executeCommand();
            });

            // Start listening. You can call this here, or attach this call to an event, button, etc.
            annyang.start();
        }
    }

});


},{}]},{},[1]);
