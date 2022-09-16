/**
 * A boilerplate microapp for ayoba that implements a stub interface and debug logging on the page
 */
var debug = false;
var ready = false;
var context;
var appcontext;
// This is the magic line that pushes error event to the magic console
window.onerror = function (msg, url, line, col, error) {
  console.log(msg, url, line, col, error);
};
console.log('Starting...');
var Ayoba = getAyoba();
// Let's wait for the page to load before doing anything
window.onload = function afterpagedLoad() {
  context = getURLParameter('context');
  debug = 'true' === getURLParameter('debug');
  if (debug) {
    console.log('Hosted at: ' + window.location.href);
  }
  if (!Ayoba) {
    console.log("Looks like we're not inside ayoba, stubbinng the situation...\n");
    Ayoba = new AyobaStub();
    Ayoba.triggerNicknameChanged();
  } else {
    console.log("Looks like we're in ayoba...\n");
  }
  console.log('\nList of methods available:');
  console.log(Object.getOwnPropertyNames(Ayoba));
  console.log("\nNow let's wait till the presence is updated...");
};

/**
 * This function ensures that the console output is visible to the user on the page for debugging purposes
 */
(function (logger) {
  console.old = console.log;
  console.log = function () {
    var output = '',
      arg,
      i;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      output += '<span class="log-' + typeof arg + '">';

      if (
        typeof arg === 'object' &&
        typeof JSON === 'object' &&
        typeof JSON.stringify === 'function'
      ) {
        output += JSON.stringify(arg);
      } else {
        output += arg;
      }

      output += '</span>&nbsp;';
    }

    logger.innerHTML += output + '<br>';
    console.old.apply(undefined, arguments);
  };
})(document.getElementById('logger'));

/**
 * Checks if the microapp is running inside ayoba and on which OS
 * returns the OS name or null if not running inside ayoba
 */
function getAyoba() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return null;
  }

  if (/android/i.test(userAgent)) {
    try {
      return Android;
    } catch (error) {
      return null;
    }
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return null; // todo
  }

  return null;
}

/**
 * This function is called when the microapp is loaded and ready to be used
 */
function start() {
  //Now that presence is updated and Ayoba is initialised, let's try calling a few functions
  ready = true;
  console.log("\nLet's try calling available methods..");
  if (Object.getOwnPropertyNames(Ayoba).includes('getSelfJid')) {
    // console.log('Calling getSelfJid()...');
    // console.log('JID: ' + getSelfJid());
  }
  if (Object.getOwnPropertyNames(Ayoba).includes('getMsisdn')) {
    console.log('Calling getMsisdn()...');
    console.log('MSISDN: ' + getMsisdn());
  }
  if (Object.getOwnPropertyNames(Ayoba).includes('getCountry')) {
    // console.log('Country: ' + getCountry());
  }
  if (Object.getOwnPropertyNames(Ayoba).includes('getLanguage')) {
    // console.log('Language: ' + getLanguage());
  }
}

/**
 * This function is called to close the microapp
 */
function finish() {
  console.log(Ayoba.finish());
}

function getMsisdn() {
  console.log('microapp getMsisdn()');
  var msisdn = Ayoba.getMsisdn();
  document.getElementById('user-msisdn').textContent = msisdn;
  return msisdn;
}

function getURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

/*
 * The Ayoba native interface calls this method every time
 * the user nickname changes (infact, always online)
 */
function onNicknameChanged(nickname) {
  console.log('Event: nickname changed: ' + nickname);

  window.getNickname = nickname;
  const nicknameField = document.getElementById('user-nickname');
  if (nicknameField && nickname) {
    nicknameField.textContent = nickname;
  }

  if (!ready) {
    start();
  }
}

/*
 * The Ayoba native interface calls this method every time
 * the user profile changes (nickname or avatar)
 */
function onProfileChanged(nickname, avatarPath) {
  console.log({ nickname, avatarPath });
  document.getElementById('user-nickname').textContent = nickname;
  document.getElementById('avatarImage').src = avatarPath;
  console.log('Event: profile changed, nickname: ' + nickname + ', avatar path: ' + avatarPath);
}

