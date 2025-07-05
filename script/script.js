
const text = "A refined design, an expression of nostalgia blended with a modern style.Vintage patterns and colors reminiscent of old-school flipcharts.A hybrid of a trip down memory lane and modern functionality to keep you organized. This is what MemoVintage offers you, so we hope you enjoy using it!!";
    const presentation = document.getElementById("text");
    let i = 0;

    function type() {
      if (i < text.length) {
        presentation.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 30);
      }
    }

