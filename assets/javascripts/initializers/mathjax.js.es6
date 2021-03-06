/* global MathJax */
import { withPluginApi } from 'discourse/lib/plugin-api';
import loadScript from 'discourse/lib/load-script';

function decorator($html){
  $.each($html, (i, domNode) =>
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, domNode]));
}


function initializePlugin(api){
  const siteSettings = api.container.lookup('site-settings:main');
  if (!siteSettings.enable_mathjax_plugin) { return; }

  loadScript(siteSettings.mathjax_url + '?config=' + siteSettings.mathjax_config, { scriptTag: true }).then(function () {
    MathJax.Hub.Config({
      "HTML-CSS": {
        preferredFont: "TeX",
        availableFonts: ["TeX"],
        linebreaks: {
          automatic: true
        },
        EqnChunk: (MathJax.Hub.Browser.isMobile ? 10 : 50)
      },
      tex2jax: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"]
        ],
        displayMath: [
          ["$$", "$$"],
          ["\\[", "\\]"]
        ],
        processEscapes: true
      },
      TeX: {
        noUndefined: {
          attributes: {
            mathcolor: "red",
            mathbackground: "#FFEEEE",
            mathsize: "90%"
          }
        },
        Macros: {
          href: "{}"
        }
      },
      messageStyle: "none"
    });
    api.decorateCooked(decorator);
  });
}

export default {
  name: 'discourse-mathjax',
  after: 'inject-objects',

  initialize: function (container) {
    withPluginApi('0.5', initializePlugin);
  }
};


