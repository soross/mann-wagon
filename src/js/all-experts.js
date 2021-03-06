import 'semantic-ui-css/components/accordion.min.css'
import 'semantic-ui-css/components/accordion.min.js'
import 'semantic-ui-css/components/segment.min.css'
import 'components/all-experts'

import List from 'list.js'
import _ from 'lodash'

var allExperts = {
  onLoad: function () {
    this.accordionMe()
    this.bindEventListeners()
    this.initializeList()
    this.applyView('liaison', true)
  },

  accordionMe: function () {
    $('.ui.accordion')
      .accordion()
  },

  applyView: function (requested, initRequest) {
    // Catch request for Experts as initial view (from homepage)
    if (initRequest && window.location.hash === '#experts') {
      requested = 'expert'
    }
    allExperts.cleanSlate()
    allExperts.filterList('type', requested)
    allExperts.toggleActiveType('js-' + requested + '-only')
  },

  bindEventListeners: function () {
    $('.js-expert-only').on('click', function () {
      allExperts.applyView('expert')
    })

    $('.js-liaison-only').on('click', function () {
      allExperts.applyView('liaison')
    })

    $('.js-filter-dept').on('click', function () {
      var department = $(this).data('dept')
      allExperts.cleanSlate()
      allExperts.filterList('dept', department)
      $(this).parent().toggleClass('all-experts__filter--active')

      return false
    })

    $('.js-filter-expertise').on('click', function () {
      var skill = $(this).data('expertise')
      allExperts.cleanSlate()
      allExperts.filterList('expertise', skill)
      $(this).parent().toggleClass('all-experts__filter--active')

      return false
    })
  },

  cleanSlate: function () {
    allExperts.toggleActiveType('clear')
    $('.all-experts__filter').removeClass('all-experts__filter--active')
  },

  initializeList: function () {
    var options = {
      valueNames: [
        { data: ['department'] },
        { data: ['expertise'] },
        { data: ['type'] }
      ]
    }

    allExperts.list = new List('js-experts', options)
  },

  filterList: function (filter, filterValue) {
    // Clear all filters
    allExperts.list.filter()

    allExperts.list.filter(function (item) {
      switch (filter) {
        case 'dept':
          var truth = _.indexOf(_.split(item.values().department, ','), filterValue) > -1
          break
        case 'expertise':
          truth = _.indexOf(_.split(item.values().expertise, ','), filterValue) > -1
          break
        case 'type':
          truth = _.indexOf(_.split(item.values().type, ','), filterValue) > -1
          break
      }

      if (truth) {
        return true
      } else {
        return false
      }
    })
  },

  toggleActiveType: function (trigger) {
    var buttons = $('.js-toggle-buttons').children()
    if (trigger === 'clear') {
      buttons.removeClass('active')
    } else {
      if ($('.' + trigger).hasClass('active')) {
        return false
      } else if (allExperts.toggleBothInactive(buttons)) {
        $('.' + trigger).toggleClass('active')
      } else {
        buttons.toggleClass('active')
      }
    }
  },

  toggleBothInactive: function (buttons) {
    var noSoupForYou = true
    buttons.each(function (index) {
      if ($(this).hasClass('active')) {
        noSoupForYou = false
      }
    })
    return noSoupForYou
  }
}

$(document).ready(function () {
  allExperts.onLoad()
})
