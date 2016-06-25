$('.counter').countTo({
    formatter: function (value, options) {
        return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0,-3);
    }
});

function updateCount(to)
{
    $('.counter').countTo({
        from: parseInt($('.counter').html().replace(/,/g, '')),
        to: to,
        formatter: function (value, options) {
            return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0,-3);
        }
    })
}

function getUpdatedCount()
{
    $.getJSON("https://petition.parliament.uk/petitions/131215.json", function (data){
        updateCount(data.data.attributes.signature_count);
        console.log("+" + (data.data.attributes.signature_count - parseInt($('.counter').html().replace(/,/g, ''))) );
    });
}

window.setInterval(function(){
    getUpdatedCount();
}, 6000);
getUpdatedCount();