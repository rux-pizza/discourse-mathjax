/* global MathJax */
import mathjaxDecorator from "discourse/plugins/discourse-mathjax/lib/decorator";
import { decorateCooked } from 'discourse/lib/plugin-api';
import loadScript from 'discourse/lib/load-script';

export default {
  name: 'discourse-mathjax',
  after: 'inject-objects',

  initialize: function (container) {
    decorateCooked(container, mathjaxDecorator);

    const siteSettings = container.lookup('site-settings:main');
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
      mathjaxDecorator();
    });
  }
};


