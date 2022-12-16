(function ($) {
    $.fn.createddsearchlist = function (options) {
        // Default options
        let settings = $.extend({
            instanceName: "wheelerware",
            defaultText: "Select an item",
            defaultId: null,
            fontSize: "14px",
            label: "",
            payload: [{ "id": "123", "name": "Item1" }, { "id": "234", "name": "Item2" }],
            searchPosition: "top",
            onChange: function () { }
        }, options);
        //control container
        let controlDiv = document.createElement("div");
        controlDiv.classList = "d-flex dropdownsearchlist";

        //label div
        let labelDiv = document.createElement("div");
        labelDiv.classList = "label-container";
        controlDiv.append(labelDiv);
        let controlLabel = document.createElement("label");
        controlLabel.classList = `control-label`;
        controlLabel.textContent = settings.label;
        controlLabel.style.fontSize = settings.fontSize;
        controlLabel.style.marginRight = "5px";
        labelDiv.append(controlLabel);

        //Outer Container
        let outerContainer = document.createElement("div");
        outerContainer.style.fontSize = settings.fontSize;
        outerContainer.classList = `${settings.instanceName} ddlist-container`;
       
        //Search Button and child elements
        let searchButton = document.createElement("div");
        searchButton.classList = `${settings.instanceName} search-button`;
        searchButton.setAttribute("title", "Click to change");
        searchButton.setAttribute("tabindex", "0");
        searchButton.addEventListener('click', function () {
            ToggleActionDropdown(settings.instanceName);
        })
        let searchArea = document.createElement("div");
        searchArea.classList = `${settings.instanceName} search-area`;
        searchButton.append(searchArea);
        let buttonLabel = document.createElement("label");
        buttonLabel.classList = `${settings.instanceName} selected-listitem`;
        buttonLabel.innerHTML = settings.defaultText;
        buttonLabel.setAttribute("id",`${settings.instanceName}-searchdropdown`);
        searchArea.append(buttonLabel);
        let dropdownIcon = document.createElement("i");
        dropdownIcon.classList = `${settings.instanceName} fa fa-chevron-down icon-position drop-down-icon`;
        searchArea.append(dropdownIcon);
        let dropupIcon = document.createElement("i");
        dropupIcon.classList = `${settings.instanceName} fa fa-chevron-up icon-position drop-up-icon hidden`;
        searchArea.append(dropupIcon);
        //end Search Button and child elements

        //Dropdown Area
        let dropdownArea = document.createElement("div");
        dropdownArea.classList = `${settings.instanceName} dropdown-area`;
        dropdownArea.style.display = "none";
        //dropdown search area
        let searchItemArea = document.createElement("div");
        searchItemArea.classList = `${settings.instanceName} search-item-area`;
        //dd-searchbox input text
        let ddSearch = document.createElement("input");
        ddSearch.classList = `${settings.instanceName} dd-searchBox`;
        ddSearch.setAttribute("type", "text");
        ddSearch.setAttribute("id", `${settings.instanceName}-dd-search search-icon`);
        ddSearch.addEventListener("keyup", function () {
            SearchDDList(this, settings.instanceName);
        })
        searchItemArea.append(ddSearch);
        let searchIcon = document.createElement("i");
        searchIcon.classList = `${settings.instanceName} fa fa-search search-icon icon-position`;
        searchItemArea.append(searchIcon);
        //list item area
        let dropdownlistArea = document.createElement("div");
        dropdownlistArea.classList = `${settings.instanceName} dropdown-list-area`;
        if (settings.searchPosition == 'top') {
            dropdownArea.append(searchItemArea);    //add the search area to the plugin
            dropdownArea.append(dropdownlistArea); //add the dropdown area to the plugin
        } else {
            dropdownArea.append(dropdownlistArea); //add the dropdown area to the plugin
            dropdownArea.append(searchItemArea);    //add the search area to the plugin

        }
        let ddsearchList = document.createElement("ul");
        ddsearchList.classList = `${settings.instanceName} ddsearch-list`;
        ddsearchList.setAttribute("tabindex", "-1");
        for (let i = 0; i < settings.payload.length; i++) {
            let liOption = document.createElement("li");
            liOption.setAttribute("tabindex", "-1");
            liOption.setAttribute("role", "option");
            liOption.setAttribute("data-value", settings.payload[i].id);
            if (settings.defaultId != null && settings.payload[i].id == settings.defaultId) {
                liOption.classList = `${settings.instanceName} ddsearch-item selected`;
                buttonLabel.innerHTML = settings.payload[i].name;
            } else {
                liOption.classList = `${settings.instanceName} ddsearch-item`;
            }
            liOption.textContent = settings.payload[i].name;
            
            liOption.addEventListener("click", function (e) {
                //console.log($(`${settings.instanceName}.ddsearch-item`));
                $(`.${settings.instanceName}.selected-listitem`).html($(this).text());
                $(`.${settings.instanceName}.selected-listitem`).attr("data-value",$(this).data("value"));
                $(`.${settings.instanceName}.ddsearch-item.selected`).removeClass("selected");
                $(this).addClass("selected");
                ToggleActionDropdown(settings.instanceName);
                var changeData = { "id": settings.payload[i].id, "name": settings.payload[i].name };
                if (settings.onChange !== undefined) {
                    settings.onChange(e,changeData);
                }
            })
            ddsearchList.append(liOption);
        }
        dropdownlistArea.append(ddsearchList);


        outerContainer.append(searchButton);
        outerContainer.append(dropdownArea);
        controlDiv.append(outerContainer);
        return this.append(controlDiv);
    };
}(jQuery));


function ToggleActionDropdown(instance) {
    
    if ($(`.${instance}.dropdown-area`).is(":visible")) {
        $(`.${instance}.dropdown-area`).hide("fast");
        $(`.${instance}.search-button`).removeClass("dd-search-state-expanded");
        $(`.${instance}.drop-up-icon`).addClass("hidden");
        $(`.${instance}.drop-down-icon`).removeClass("hidden");
        $(`.${instance}.dd-searchBox`).val("");
        $(`.${instance}.ddsearch-item`).show();
       
    } else {
        $(`.${instance}.dropdown-area`).show("fast");
        $(`.${instance}.search-button`).addClass("dd-search-state-expanded");
        $(`.${instance}.drop-up-icon`).removeClass("hidden");
        $(`.${instance}.drop-down-icon`).addClass("hidden");
        $(`.${instance}.dd-searchBox`).focus();
    }
}
function SearchDDList(el, instance) {
    var value = $(el).val().toLowerCase().trim();
    var list = $(`.${instance}.ddsearch-item`).show().filter(function () {
        return $(this).text().toLowerCase().trim().indexOf(value) == -1;
    }).hide();
}