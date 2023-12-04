const boom = require('@hapi/boom');

const sanitizeHtml = require('sanitize-html');

function sanitizeHtmlHandler(req, res, next) {
  if (req.body['description']) {
    const clean = sanitizeHtml(req.body['description'], {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
      alllowedAttributes: false,
      allowedClasses: {
        '*': [ 'iwp-property-block-title' ]
      },
      allowedStyles: {
        '*': {
          'text-align': [ '/^left$/', '/^right$/', '/^center$/' ],
          'font-size': [ '/^\\d+(\\.\\d+)?(px|em|rem|%)$/' ],
          'font-weight': [ '/^\\d+$/' ],
          'font-style': [ '/^italic$/' ],
          'color': [ '/^#(\\d|[a-f]){3,6}$/' ],
          'background-color': [ '/^#(\\d|[a-f]){3,6}$/' ],
          'text-decoration': [ '/^underline$/' ],
          'margin': [ '/^\\d+(\\.\\d+)?(px|em|rem|%)$/' ],
          'padding': [ '/^\\d+(\\.\\d+)?(px|em|rem|%)$/' ],
          'border': [ '/^\\d+(\\.\\d+)?(px|em|rem|%)$/' ],
          'border-radius': [ '/^\\d+(\\.\\d+)?(px|em|rem|%)$/' ],
          'border-color': [ '/^#(\\d|[a-f]){3,6}$/' ],
          'border-style': [ '/^solid$/' ],
          'border-width': [ '/^\\d+(\\.\\d+)?(px|em|rem|%)$/' ],
          'width': [ '/^\\d+(\\.\\d+)?(px|em|rem|%)$/' ],
          'height': [ '/^\\d+(\\.\\d+)?(px|em|rem|%)$/' ],
          'display': [ '/^inline$/', '/^block$/', '/^inline-block$/' ],
          'float': [ '/^left$/', '/^right$/' ],
        }
      }
    });
    if (clean == "") {
      throw boom.badRequest('Description has invalid html');
    }
    req.body['description'] = clean;
  }
  next();
}

module.exports = sanitizeHtmlHandler;
