export const A11yIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.413 7.684">
      <defs>
        <clipPath clipPathUnits="userSpaceOnUse" id="a11y-b">
          <path
            fill="#fff"
            stroke-width=".073"
            stroke-linecap="round"
            stroke-dashoffset="16.97"
            d="M1.72.257h5.343v7.191H1.72z"
          />
        </clipPath>

        <filter
          id="a11y-protanopia"
          filterUnits="userSpaceOnUse"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="linearRGB"
          // color-interpolation-filters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="
        			0.152286 1.052583 -0.204868 0.000 0.000
        			0.114503 0.786281 0.099216  0.000 0.000
        			-0.003882 -0.048116	1.051998 0.000 0.000
        			0.000 0.000 0.000 1.000 0.000"
          ></feColorMatrix>
        </filter>

        <filter id="a11y-deuteranopia" color-interpolation-filters="sRGB">
          <feColorMatrix
            values="
        		 		0.367 0.861 -0.228 0.000 0.000
        				0.280 0.673 0.047 0.000 0.000
        				-0.012 0.043 0.969 0.000 0.000
        				0.000 0.000 0.000 1.000 0.000"
          ></feColorMatrix>
        </filter>

        <filter id="a11y-tritanopia" color-interpolation-filters="sRGB">
          <feColorMatrix
            values="
        			  1.255528 -0.076749 -0.178779 0.000 0.000
        			  -0.078411 0.930809 0.147602 0.000 0.000
        			  0.004733 0.691367 0.303900 0.000 0.000
        			  0.000 0.000 0.000 1.000 0.000"
          ></feColorMatrix>
        </filter>

        <filter id="a11y-achromatopsia" color-interpolation-filters="sRGB">
          <feColorMatrix
            values="
            		0.21, 0.72, 0.07, 0, 0
              		0.21, 0.72, 0.07, 0, 0
              		0.21, 0.72, 0.07, 0, 0
              		0, 0, 0, 1, 0"
          ></feColorMatrix>
        </filter>
      </defs>
      <g class="card" opacity="0">
        <path
          d="M3.672 2.293h4.253c.13 0 .234.104.234.234v2.622c0 .13-.104.233-.234.233H3.672a.233.233 0 01-.234-.233V2.527c0-.13.104-.234.234-.234z"
          fill="#fff"
          paint-order="markers fill stroke"
        />

        <g class="card-content" filter="url(#a11y-protanopia)">
          <g class="card-art">
            <path
              d="M8.001 2.748a.292.292 0 11-.584 0 .292.292 0 01.584 0z"
              fill="#5858ff"
              paint-order="markers fill stroke"
              class="moon"
              style="transform-origin: center; transform-box: fill-box; transform: scale(0, 0);"
            />
            <path
              d="M7.338 3.202a.293.293 0 01-.527.176c.054-.403.38-.404.396-.421.08.052.131.142.131.245z"
              class="moon-shadow"
              fill="#fff"
            />
            <path
              d="M7.2 2.638s-.242.124-.342.498c-.1.373-.015.402.091.43.108.029.196.047.296-.327.1-.373-.045-.601-.045-.601z"
              fill="#fe2dff"
              class="flower-petal-3"
              paint-order="markers fill stroke"
              style="transform-origin: bottom center; transform-box: fill-box; transform: scale(0, 0);"
            />
            <path
              d="M6.954 2.436s-.235.215-.235.67c0 .454.105.46.234.46.131 0 .237-.006.237-.46 0-.455-.234-.67-.234-.67z"
              fill="#ff2db5"
              class="flower-petal-2"
              paint-order="markers fill stroke"
              style="transform-origin: bottom center; transform-box: fill-box; transform: scale(0, 0);"
            />
            <path
              d="M6.958 5.376V3.404"
              fill="none"
              stroke="green"
              stroke-width=".059"
              class="flower-stem"
              style="transform-origin: bottom; transform-box: fill-box; transform: scale(0, 0);"
            />
            <g
              class="flower-leaf-1"
              paint-order="markers fill stroke"
              style="transform-origin: right; transform-box: fill-box; transform: scale(0, 0);"
            >
              <path
                d="M6.244 3.778s.26.1.452.1.17-.068.244-.101z"
                fill="#8fff8f"
              />
              <path
                d="M6.244 3.778s.26-.1.452-.1.244.045.244.099z"
                fill="green"
              />
            </g>
            <g
              class="flower-leaf-0"
              paint-order="markers fill stroke"
              style="transform-origin: left; transform-box: fill-box; transform: scale(0, 0);"
            >
              <path
                d="M7.734 4.311s-.285.11-.495.11c-.211 0-.193-.064-.27-.11z"
                fill="#8fff8f"
              />
              <path
                d="M7.734 4.311s-.284-.11-.495-.11c-.212 0-.27.05-.27.11z"
                fill="green"
              />
            </g>
            <g
              paint-order="markers fill stroke"
              style="transform-origin: center; transform-box: fill-box; transform: scale(0, 0);"
              class="flower-closed-bud"
            >
              <path
                d="M6.969 2.6s-.201.183-.201.571c0 .388.09.393.2.393.112 0 .202-.005.202-.393s-.2-.571-.2-.571z"
                fill="#ff2d79"
                class="flower-petal-1"
              />
              <path
                d="M6.8 2.957s-.032-.174-.032.214.09.393.2.393c.235-.02-.14-.412-.168-.607z"
                fill="#d42100"
                class="flower-petal-0"
              />
            </g>
          </g>
          <text
            style="line-height:1.25"
            x="3.98"
            y="4.521"
            class="card-text"
            font-size="1.873"
            font-family="sans-serif"
            letter-spacing="0"
            word-spacing="0"
            stroke-width=".108"
            opacity="0"
            fill="#ff9b9b"
          >
            <tspan
              x="3.98"
              y="4.521"
              style="-inkscape-font-specification:'Ubuntu, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
              font-weight="400"
              font-family="Ubuntu"
            >
              Hi
            </tspan>
          </text>
        </g>
      </g>
      <g class="contrast" opacity="0">
        <path
          d="M1.518 2.02a.212.212 0 00-.213.213V5.45a.212.212 0 00.213.213h3.51a.212.212 0 00.212-.213v-.97l1.013-.585L5.24 3.31V2.233a.212.212 0 00-.212-.213z"
          fill="#fff"
          stroke="#000"
          stroke-width=".104"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dashoffset="16.97"
          paint-order="markers fill stroke"
        />
        <g class="color-container">
          <circle
            cx="4.551"
            cy="2.688"
            r=".404"
            fill="none"
            stroke="#000"
            stroke-width=".047"
            stroke-linecap="round"
            stroke-dashoffset="16.97"
          />
          <circle cx="4.551" cy="2.688" r=".28" class="color" fill="#ff9b9b" />
        </g>
        <g class="contrast-small-fail">
          <path fill="#fff" d="M4.548 3.449a.355.355 0 10.003 0z" />
          <path
            d="M4.547 3.377a.427.427 0 00-.423.427.427.427 0 00.427.427.427.427 0 00.428-.427.427.427 0 00-.428-.427.427.427 0 00-.004 0zm-.167.203l.171.172.171-.172.053.053-.171.171.171.171-.053.053-.17-.171-.172.17-.052-.052.17-.17-.17-.172z"
            fill="#ba115b"
          />
        </g>
        <g class="contrast-small-success" opacity="0">
          <path d="M4.548 3.432a.372.372 0 10.003 0z" fill="#fff" />
          <path
            fill="#19ad19"
            d="M4.547 3.377a.427.427 0 00-.423.427.427.427 0 00.427.427.427.427 0 00.428-.427.427.427 0 00-.428-.427.427.427 0 00-.004 0zm.225.219l.053.052-.312.312-.052.052-.053-.052-.13-.13.052-.053.13.13z"
          />
        </g>
        <g class="contrast-large-fail">
          <path fill="#fff" d="M4.548 4.527a.355.355 0 10.003 0z" />
          <path
            d="M4.547 4.455a.427.427 0 00-.423.427.427.427 0 00.427.428.427.427 0 00.428-.428.427.427 0 00-.428-.427.427.427 0 00-.004 0zm-.167.204l.171.17.171-.17.053.052-.171.171.171.172-.053.052-.17-.171-.172.171-.052-.052.17-.172-.17-.17z"
            fill="#ba115b"
          />
        </g>
        <g class="contrast-large-success" opacity="0">
          <path d="M4.548 4.51a.372.372 0 10.003 0z" fill="#fff" />
          <path
            fill="#19ad19"
            d="M4.547 4.455a.427.427 0 00-.423.427.427.427 0 00.427.428.427.427 0 00.428-.428.427.427 0 00-.428-.427.427.427 0 00-.004 0zm.225.219l.053.052-.312.312-.052.053-.053-.053-.13-.13.052-.053.13.13z"
          />
        </g>
        <text
          style="line-height:1.25"
          x="1.781"
          y="4.119"
          font-size="1.029"
          font-family="sans-serif"
          letter-spacing="0"
          word-spacing="0"
          stroke-width=".223"
        >
          <tspan
            x="1.781"
            y="4.119"
            style="-inkscape-font-specification:'Ubuntu, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
            font-weight="400"
            font-family="Ubuntu"
            stroke-width=".05"
          >
            AA
          </tspan>
        </text>
        <text
          style="line-height:1.25"
          x="1.781"
          y="5.277"
          font-size="1.029"
          font-family="sans-serif"
          letter-spacing="0"
          word-spacing="0"
          stroke-width=".223"
        >
          <tspan
            x="1.781"
            y="5.277"
            style="-inkscape-font-specification:'Ubuntu, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
            font-weight="400"
            font-family="Ubuntu"
            stroke-width=".05"
          >
            AAA
          </tspan>
        </text>
        <text
          style="line-height:1.25"
          x="1.726"
          y="3.03"
          font-size=".98"
          font-family="sans-serif"
          letter-spacing="0"
          word-spacing="0"
          stroke-width=".057"
          class="contrast-text"
        >
          <tspan
            x="1.726"
            y="3.03"
            style="-inkscape-font-specification:'Ubuntu, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
            font-weight="400"
            font-family="Ubuntu"
          >
            2
          </tspan>
        </text>
      </g>
      <g class="rgb" opacity="0">
        <rect
          width="3.236"
          height="1.144"
          x="1.261"
          y="2.073"
          ry=".227"
          fill="#fff"
          paint-order="markers fill stroke"
          stroke="#000"
          stroke-width=".1"
        />
        <text x="1.711" y="3.041" font-size="2.674" stroke-width=".223">
          <tspan
            x="1.711"
            y="3.041"
            style="-inkscape-font-specification:'Ubuntu, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
            font-weight="400"
            font-size="1.176"
            font-family="Ubuntu"
            stroke-width=".05"
          >
            <tspan
              class="rgb-r"
              fill="#d20000"
              stroke-width=".011"
              style="-inkscape-font-specification:'Ubuntu Medium'"
              font-weight="500"
            >
              R
            </tspan>
            <tspan
              class="rgb-g"
              fill="#0d9c00"
              stroke-width=".011"
              style="-inkscape-font-specification:'Ubuntu Medium'"
              font-weight="500"
            >
              G
            </tspan>
            <tspan
              class="rgb-b"
              fill="#0000d6"
              stroke-width=".011"
              style="-inkscape-font-specification:'Ubuntu Medium'"
              font-weight="500"
            >
              B
            </tspan>
          </tspan>
        </text>
        <use
          {...{ "xlink:href": "#a11y-a" }}
          transform="translate(.77)"
          width="100%"
          height="100%"
          class="block-g"
          opacity="0"
        />
        <g class="block-r" opacity="0">
          <path
            d="M2.082 2.317a.332.332 0 00-.331.332.332.332 0 00.33.33.332.332 0 00.332-.33.332.332 0 00-.331-.332zm-.265.332c0-.146.12-.265.265-.265.06 0 .116.02.162.056l-.37.371a.26.26 0 01-.057-.162zm.265.265a.262.262 0 01-.163-.057l.37-.37a.26.26 0 01.058.162c0 .145-.12.265-.265.265z"
            id="a11y-a"
            fill="#000"
            fill-rule="evenodd"
            stroke="none"
            stroke-width=".059"
          />
        </g>
        <use
          {...{ "xlink:href": "#a11y-a" }}
          transform="translate(1.54)"
          width="100%"
          height="100%"
          class="block-b"
          opacity="0"
        />
      </g>
      <g clip-path="url(#a11y-b)" class="person-container">
        <path
          d="M5.001 2.347a.734.734 0 00.039-1.3.688.688 0 00-.334-.074.674.674 0 00-.334.074.767.767 0 00-.382.646c0 .294.223.598.508.691.137.045.37.028.503-.037zm-.894 4.304c.06-.05.091-.117.168-.364.11-.353.22-.783.301-1.183.058-.281.085-.348.14-.348.067 0 .107.106.203.537.108.48.288 1.142.346 1.27.07.152.286.192.41.075.09-.085.093-.178.012-.441-.253-.827-.41-1.64-.456-2.375-.031-.487-.016-.596.091-.65a1.38 1.38 0 01.326-.049c.596-.037 1.18-.116 1.264-.17.194-.127.106-.462-.123-.464-.041 0-.245.02-.453.047-.98.121-2.233.127-3.384.015-.365-.036-.448-.021-.515.088-.108.178-.003.375.216.407.176.025.995.087 1.154.087.18 0 .292.03.366.1.051.048.055.07.055.304 0 .659-.147 1.549-.399 2.41-.117.402-.145.588-.096.648.107.13.26.153.374.056z"
          fill="#888f9b"
          class="person"
          style="transform-origin: left; transform-box: fill-box;"
        />
      </g>
    </svg>
  );
};

export const PerformanceIcon = () => {
  // const { onClick } = useInteractivity();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.413 7.684">
      <defs>
        <linearGradient id="perf-d">
          <stop offset="0" stop-color="#629bff" />
          <stop offset="1" stop-color="#003eaa" stop-opacity=".996" />
        </linearGradient>
        <linearGradient id="perf-c">
          <stop offset="0" stop-color="#d60000" />
          <stop offset="1" stop-color="#ff8989" />
        </linearGradient>
        <linearGradient id="perf-b">
          <stop offset="0" stop-color="#0056eb" />
          <stop offset=".77" stop-color="#0a55db" />
          <stop offset=".807" stop-color="#3c7ff4" />
          <stop offset=".839" stop-color="#1263f1" />
          <stop offset=".954" stop-color="#0b2be8" />
          <stop offset="1" stop-color="#3880ff" />
        </linearGradient>
        <linearGradient id="perf-a">
          <stop offset="0" stop-color="#0056eb" />
          <stop offset=".453" stop-color="#1969f4" />
          <stop offset="1" stop-color="#3880ff" />
        </linearGradient>
        {/* <linearGradient
          {...{ "xlink:href": "#perf-b" }}
          id="perf-g"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(.24306 0 0 .24306 -24.461 -87.63)"
          x1="121.506"
          y1="387.748"
          x2="121.506"
          y2="377.14"
        /> */}
        <linearGradient
          {...{ "xlink:href": "#perf-c" }}
          id="perf-h"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(.24306 0 0 .24306 -24.461 -87.533)"
          x1="129.93"
          y1="378.776"
          x2="128.408"
          y2="377.335"
        />
        <linearGradient
          {...{ "xlink:href": "#perf-d" }}
          id="perf-i"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(.24306 0 0 .24306 -25.093 -87.533)"
          x1="126"
          y1="377.497"
          x2="127.015"
          y2="378.728"
        />
        <linearGradient
          {...{ "xlink:href": "#perf-d" }}
          id="perf-j"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(.24306 0 0 .24306 -24.442 -87.533)"
          x1="126"
          y1="377.497"
          x2="127.015"
          y2="378.728"
        />
        <linearGradient
          {...{ "xlink:href": "#perf-b" }}
          id="perf-e"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(.24306 0 0 .24306 -24.461 -87.63)"
          x1="121.506"
          y1="387.748"
          x2="121.506"
          y2="377.14"
        />
        {/* <linearGradient
          {...{ "xlink:href": "#perf-b" }}
          id="perf-f"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(.24306 0 0 .24306 -24.461 -87.63)"
          x1="121.506"
          y1="387.748"
          x2="121.506"
          y2="377.14"
        /> */}
      </defs>
      <g class="perf-container" style="transform-origin: center;">
        <g class="files" opacity="0" style="transform-origin: center;">
          <g class="file-img-2">
            <path d="M4.98.861L4.837.697a.026.026 0 00-.02-.009h-.363a.03.03 0 00-.03.03v.716a.03.03 0 00.03.03h.502a.03.03 0 00.03-.03V.878A.026.026 0 004.98.861z" />
            <path
              d="M4.454 1.436V.719h.353v.156c0 .008.006.014.015.014h.134v.547z"
              fill="#e580ff"
            />
            <path
              d="M4.507 1.326c-.013-.003-.022-.016-.02-.03V.975c.005-.012.016-.022.03-.019h.385c.011.005.022.016.019.03v.323c-.005.011-.017.022-.03.019h-.384zm.075-.154c.02-.024.04-.05.062-.073.021-.015.036.013.05.025.015.014.026.034.045.042.019-.002.029-.03.05-.024.035.035.067.072.1.108 0-.083.002-.166 0-.248C4.89.984 4.87.986 4.87.986h-.334c-.026-.004-.017.028-.019.043v.22l.065-.077zm.22-.064c-.031-.007-.046-.046-.028-.071.016-.025.057-.027.074-.003.021.023.009.064-.02.073a.044.044 0 01-.027.001z"
              fill="#405"
            />
          </g>
          <g class="file-img-1">
            <path d="M4.98.861L4.836.697a.026.026 0 00-.02-.009h-.362a.03.03 0 00-.03.03v.716a.03.03 0 00.03.03h.502a.03.03 0 00.03-.03V.88A.026.026 0 004.98.86z" />
            <path
              d="M4.454 1.436V.719h.352v.156c0 .008.007.015.016.015h.134v.546z"
              fill="#e580ff"
            />
            <path
              d="M4.507 1.326c-.013-.003-.023-.016-.02-.029V.974c.005-.012.016-.021.029-.019H4.9c.012.005.022.016.02.03v.323c-.005.011-.017.022-.03.02-.128 0-.256 0-.384-.002zm.075-.154c.02-.024.04-.05.062-.073.02-.015.036.013.049.025.015.014.027.034.046.042.019-.002.029-.03.05-.023.034.034.067.07.1.107v-.248C4.89.984 4.87.986 4.87.986h-.333c-.026-.004-.017.028-.019.043v.22zm.219-.064c-.03-.006-.046-.046-.027-.07.016-.026.056-.028.074-.004.021.023.008.064-.02.073a.044.044 0 01-.027.001z"
              fill="#405"
            />
          </g>
          <g class="file-img-0">
            <path d="M4.98.861L4.836.697a.026.026 0 00-.02-.009h-.362a.03.03 0 00-.03.03v.717a.03.03 0 00.03.03h.502a.03.03 0 00.03-.03V.878A.026.026 0 004.98.86z" />
            <path
              d="M4.454 1.436V.719h.352v.155c0 .009.007.016.015.016h.135v.546z"
              fill="#e580ff"
            />
            <path
              d="M4.506 1.327c-.012-.004-.022-.017-.02-.03V.974c.005-.011.017-.022.03-.02h.386c.011.006.022.017.019.03v.323c-.005.012-.017.022-.03.02h-.384zm.076-.155c.02-.024.04-.05.062-.073.02-.015.036.012.049.025.015.014.027.034.046.042.019-.003.029-.03.05-.024l.1.107v-.248c.001-.017-.02-.015-.02-.015h-.334c-.025-.004-.016.028-.018.043v.22zm.219-.064c-.03-.007-.046-.046-.027-.07.016-.027.056-.028.074-.004.021.023.008.064-.021.073a.044.044 0 01-.027.001z"
              fill="#405"
            />
          </g>
          <g class="file-js">
            <path d="M4.98.861L4.836.698a.026.026 0 00-.02-.01h-.362a.03.03 0 00-.03.031v.715a.03.03 0 00.03.03h.502a.03.03 0 00.03-.03V.879A.026.026 0 004.98.862z" />
            <path
              d="M4.454 1.435V.719h.352v.156c0 .008.007.015.016.015h.134v.545z"
              fill="#f5de19"
            />
            <path d="M4.725 1.238a.062.062 0 00.057.035c.024 0 .039-.012.039-.028 0-.02-.016-.027-.042-.038L4.765 1.2c-.041-.017-.069-.04-.069-.086 0-.042.033-.075.084-.075a.085.085 0 01.081.045l-.044.03a.039.039 0 00-.037-.026.025.025 0 00-.028.025c0 .017.011.024.035.035l.015.006c.048.02.076.042.076.09 0 .052-.04.08-.095.08a.11.11 0 01-.104-.06zm-.202.005c.01.016.018.03.037.03s.03-.008.03-.037v-.194h.058v.195c0 .06-.035.086-.085.086a.089.089 0 01-.086-.052z" />
          </g>
          <g class="file-css">
            <path d="M4.98.861L4.836.698a.026.026 0 00-.02-.009h-.362a.03.03 0 00-.03.03v.715c0 .016.013.03.03.03h.502a.03.03 0 00.03-.03V.879A.026.026 0 004.98.86z" />
            <path
              d="M4.454 1.435V.719h.352v.156c0 .008.007.015.015.015h.135v.545z"
              fill="#1572b6"
            />
            <path
              d="M4.56.972l.002.016.002.031.001.014H4.8l-.006.063H4.64l.002.016.003.031v.014h.144l-.008.08-.068.018-.068-.019-.004-.049h-.062l.009.096.125.035.126-.034v-.01l.01-.117.016-.169.001-.016h-.153z"
              fill="#fff"
            />
          </g>
          <g class="file-html">
            <path d="M4.98.862L4.836.698a.026.026 0 00-.02-.01h-.362a.03.03 0 00-.03.031v.715c0 .017.013.03.03.03h.502a.03.03 0 00.03-.03V.879A.026.026 0 004.98.862z" />
            <path
              d="M4.454 1.436V.72h.352v.155c0 .008.007.015.016.015h.134v.546z"
              fill="#e44f26"
            />
            <path
              d="M4.559 1.026l.001.015.014.159h.2l-.006.075-.064.018-.065-.018-.004-.046h-.058l.008.09.118.034.119-.033v-.01l.014-.152.001-.015h-.21l-.005-.06h.22l.002-.013.003-.03v-.014h-.143z"
              fill="#fff"
            />
          </g>
        </g>
        <g
          class="browser"
          style="transform-origin: center; transform: translate(-2.5px, -2.3px) scale(0, 0) rotate(0deg);"
        >
          <rect
            width="5.15"
            height="3.397"
            x="2.132"
            y="4.248"
            ry=".237"
            class="browser-body"
            fill="#fff"
          />
          <g class="page" opacity="0">
            <path
              fill="#43b7ff"
              paint-order="markers fill stroke"
              d="M2.132 4.413h5.151v1.469H2.132z"
              class="hero-bg"
              style="transform-origin: center;"
            />

            <path
              d="M3.039 7.515h1.207M3.039 6.107h3.445m-3.445.31h2.945m-2.945.309h3.096"
              class="page-txt"
              stroke="gray"
              stroke-width=".064"
            />
            <g class="heros-img">
              <g
                class="hero-windowsxp"
                // @ts-ignore
                fill="#0000007a"
                opacity="0"
              >
                <path d="M6.165 5.264l-.117.405c-.101-.07-.212-.126-.446-.028l.114-.4.001-.001c.234-.097.347-.046.448.024zM6.226 5.303l-.115.4c.101.07.214.125.448.027l.111-.39c-.238.082-.342.032-.444-.037z" />
                <path d="M6.185 5.19l.115-.4c-.102-.07-.214-.125-.449-.027l-.115.403a.595.595 0 01.228-.056c.094 0 .16.04.22.08zM6.36 4.832l-.115.403c.102.07.224.126.448.025l.116-.402c-.234.097-.347.043-.448-.026z" />
              </g>
              <path
                d="M6.158 5.715l-.001-.442.6.003-.001.524zm-.504-.068v-.378l.451.004v.435zm0-.795l.45-.065.001.437-.452.003zm.503-.072l.598-.087.001.518-.6.012z"
                class="hero-windows10"
                fill="#0000007a"
              />

              <path
                d="M6.47 5.68c-.051.05-.108.042-.162.019a.205.205 0 00-.17 0c-.075.032-.115.023-.16-.019-.256-.263-.218-.664.073-.68.07.004.12.04.161.042.062-.012.121-.048.187-.043.08.006.139.037.179.094a.208.208 0 00.025.374.53.53 0 01-.133.214zm-.264-.682a.215.215 0 01.197-.223c.015.135-.123.236-.197.223z"
                class="hero-mac"
                opacity="0"
                fill="#0000007a"
              />
            </g>
            <path
              fill="#43b7ff"
              paint-order="markers fill stroke"
              d="M3.03 6.925h.693v.415H3.03zm.953 0h.693v.415h-.693z"
              class="page-img-bg"
            />
            <path
              d="M3.225 7.02l.068.12.07.119h-.276l.069-.12zm.945.233l-.111-.077-.012-.134.123-.058.122.058-.011.134z"
              fill="#0000007a"
              paint-order="markers fill stroke"
              class="page-img-img"
            />
          </g>
          <g class="title-bars">
            <g class="browser-windowsxp" opacity="0">
              <rect
                width="5.053"
                height="3.087"
                x="2.18"
                y="4.544"
                class="frame"
                fill="none"
                stroke="#0056eb"
                stroke-width=".097"
                stroke-linecap="round"
                stroke-dashoffset="16.97"
              />

              <g class="title-bar-windowsxp">
                <path
                  d="M6.763 3.985v.645h.52v-.39a.256.256 0 00-.256-.255z"
                  class="title-right"
                  fill="url(#perf-e)"
                  paint-order="markers fill stroke"
                />
                <path
                  d="M2.615 3.985v.645h4.254v-.645z"
                  class="title-mid"
                  fill="url(#perf-e)"
                  paint-order="markers fill stroke"
                />
                <path
                  d="M2.388 3.985a.256.256 0 00-.256.256v.389h.564v-.645z"
                  class="title-left"
                  fill="url(#perf-e)"
                  paint-order="markers fill stroke"
                />
                <g class="title-bar-buttons">
                  <g class="title-bar-close">
                    <rect
                      width=".482"
                      height=".482"
                      x="6.661"
                      y="4.089"
                      ry=".095"
                      class="hover"
                      fill="url(#perf-h)"
                      stroke="#fff"
                      stroke-width=".026"
                      stroke-linecap="round"
                      stroke-dashoffset="16.97"
                    />
                    <path
                      d="M6.75 4.486l.304-.305m-.305 0l.305.305"
                      fill="none"
                      stroke="#fff"
                      stroke-width=".064"
                    />
                  </g>
                  <g class="title-bar-collapse">
                    <rect
                      width=".482"
                      height=".482"
                      x="5.36"
                      y="4.089"
                      ry=".095"
                      class="hover"
                      fill="url(#perf-i)"
                      stroke="#fff"
                      stroke-width=".026"
                      stroke-linecap="round"
                      stroke-dashoffset="16.97"
                    />
                    <path
                      d="M5.645 4.44h-.202"
                      fill="none"
                      stroke="#fff"
                      stroke-width=".064"
                    />
                  </g>
                  <g class="title-bar-expand">
                    <rect
                      width=".482"
                      height=".482"
                      x="6.01"
                      y="4.089"
                      ry=".095"
                      class="hover"
                      fill="url(#perf-j)"
                      stroke="#fff"
                      stroke-width=".026"
                      stroke-linecap="round"
                      stroke-dashoffset="16.97"
                    />
                    <path
                      d="M6.112 4.24h.279m-.28-.044h.28v.279h-.28z"
                      class="expand"
                      fill="none"
                      stroke="#fff"
                      stroke-width=".05"
                    />
                    <path
                      d="M6.183 4.28v-.075h.213v.173h-.054m-.235-.097h.212v.173h-.212z"
                      class="minimize"
                      fill="none"
                      stroke="#fff"
                      stroke-width=".039"
                      stroke-linecap="round"
                      stroke-dashoffset="16.97"
                      paint-order="markers fill stroke"
                      opacity="0"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g class="title-bar-windows10" opacity="0">
              <path
                d="M6.763 4.147v.434h.52v-.434z"
                class="title-right"
                fill="#fff"
              />
              <path
                d="M2.615 4.147v.434H6.87v-.434z"
                class="title-mid"
                fill="#fff"
              />
              <path
                d="M2.132 4.147v.434h.564v-.434z"
                class="title-left"
                fill="#fff"
              />
              <g class="title-bar-buttons">
                <g class="title-bar-close">
                  <path
                    d="M6.427 4.147h.856v.433h-.856z"
                    class="hover"
                    fill="#fff"
                  />
                  <path
                    d="M6.742 4.477l.226-.227m-.226 0l.226.227"
                    class="hover-icon"
                    fill="none"
                    stroke="#000"
                    stroke-width=".03"
                  />
                </g>
                <g class="title-bar-collapse">
                  <path
                    class="hover"
                    fill="#fff"
                    d="M4.716 4.147h.856v.433h-.856z"
                  />
                  <path
                    d="M5.26 4.364h-.233"
                    fill="none"
                    stroke="#000"
                    stroke-width=".03"
                  />
                </g>
                <g class="title-bar-expand">
                  <path
                    class="hover"
                    fill="#fff"
                    d="M5.572 4.147h.856v.433h-.856z"
                  />
                  <path
                    d="M6.055 4.414h.035v-.14h-.14v.035m-.041.145h.14v-.14h-.14z"
                    class="minimize"
                    fill="none"
                    stroke="#000"
                    opacity="0"
                    stroke-width=".02"
                  />
                  <path
                    class="expand"
                    fill="none"
                    stroke="#000"
                    stroke-width=".028"
                    stroke-linecap="round"
                    stroke-dashoffset="16.97"
                    paint-order="markers fill stroke"
                    d="M5.896 4.26h.208v.208h-.208z"
                  />
                </g>
              </g>
            </g>
            <g class="title-bar-mac">
              <path
                d="M6.763 4.08v.546h.52v-.291a.255.255 0 00-.256-.254z"
                class="title-right"
              />
              <path d="M2.615 4.08v.546H6.87V4.08z" class="title-mid" />
              <path
                d="M2.388 4.079a.256.256 0 00-.256.256v.29h.564v-.544h-.308z"
                class="title-left"
              />
              <g class="title-bar-buttons">
                <g class="title-bar-close">
                  <circle
                    cx="2.437"
                    cy="4.37"
                    r=".115"
                    fill="#ff2a2a"
                    paint-order="markers fill stroke"
                  />
                  <g
                    class="hover"
                    // @ts-ignore
                    fill="none"
                    stroke="#640000"
                    stroke-width=".03"
                  >
                    <path d="M2.379 4.311l.116.117M2.379 4.428l.116-.117" />
                  </g>
                </g>
                <g class="title-bar-collapse">
                  <circle
                    cx="2.86"
                    cy="4.37"
                    r=".115"
                    fill="#fc0"
                    paint-order="markers fill stroke"
                  />
                  <path
                    d="M2.794 4.37h.131"
                    class="hover"
                    fill="none"
                    stroke="#5c4a00"
                    stroke-width=".04"
                  />
                </g>
                <g class="title-bar-expand">
                  <circle
                    cx="3.282"
                    cy="4.37"
                    r=".115"
                    fill="#00eb13"
                    paint-order="markers fill stroke"
                  />
                  <g
                    class="minimize hover"
                    // @ts-ignore
                    fill="#006100"
                  >
                    <path d="M3.373 4.375l-.086.086-.007-.093z" />
                    <path d="M3.19 4.364l.086-.086.007.093z" />
                  </g>
                  <g
                    class="expand hover"
                    // @ts-ignore
                    fill="#006100"
                  >
                    <path d="M3.254 4.427l.085-.085.007.092zM3.31 4.312l-.086.086-.006-.093z" />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g class="page-btn" opacity="0">
            <path
              d="M3.03 5.305v.09c0 .083.067.148.15.148h1.136a.147.147 0 00.149-.148v-.09c0 .083-.066.15-.149.15H3.18a.15.15 0 01-.15-.15z"
              fill="#002c5a"
            />
            <rect
              width="1.436"
              height=".479"
              x="3.029"
              y="4.976"
              ry=".15"
              fill="#00023e84"
              class="page-btn-bg"
              // fill-opacity=".518"
            />
            <text
              style="line-height:1.25;-inkscape-font-specification:'Ubuntu, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal; pointer-events: none;"
              x="3.383"
              y="5.359"
              class="page-btn-txt"
              font-weight="400"
              font-size=".469"
              font-family="Ubuntu"
              letter-spacing=".08"
              word-spacing="0"
              fill="#fff"
              stroke-width=".027"
            >
              <tspan x="3.383" y="5.359">
                try
              </tspan>
            </text>
            <path
              d="M4.12 5.215l-.218-.125m.217.125l-.217.126m-.459-.126h.676"
              class="page-btn-arrow"
              fill="none"
              stroke="#fff"
              stroke-width=".043"
              stroke-linecap="round"
              opacity="0"
            />
          </g>
        </g>
        <g class="result-score" style="pointer-events: none;">
          <g
            class="percent"
            opacity="0"
            style="transform-origin: center; transform-box: fill-box;"
          >
            <circle
              transform="rotate(-90)"
              cx="-7.507"
              cy="7.01"
              r="1.179"
              fill="#afe9af"
              paint-order="markers fill stroke"
            />
            <circle
              transform="rotate(-90)"
              r="1.179"
              cy="7.01"
              cx="-7.507"
              class="percent-progress-bar"
              fill="none"
              stroke="#006d00"
              stroke-width=".274"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dashoffset="16.97"
              paint-order="markers fill stroke"
            />
            <text
              style="line-height:1.25;text-align:center"
              x="6.988"
              y="7.863"
              font-size="1.044"
              font-family="sans-serif"
              letter-spacing="0"
              word-spacing="0"
              text-anchor="middle"
              fill="#006d00"
              class="percent-text"
              stroke-width=".06"
            >
              <tspan
                x="6.988"
                y="7.863"
                style="-inkscape-font-specification:'Ubuntu, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center"
                font-weight="400"
                font-family="Ubuntu"
              >
                0
              </tspan>
            </text>
          </g>
          <g
            class="checkmark"
            opacity="0"
            style="transform-origin: center; transform-box: fill-box;"
          >
            <path d="M6.999 6.36a1.147 1.147 0 10.01 0z" fill="#fff" />
            <path
              fill="green"
              d="M6.997 6.191a1.316 1.316 0 00-1.303 1.316 1.316 1.316 0 001.315 1.316 1.316 1.316 0 001.316-1.316A1.316 1.316 0 007.01 6.191a1.316 1.316 0 00-.012 0zm.693.674l.162.162-.96.96-.162.162a6.139 6.139 0 01-.161-.162l-.402-.402.161-.161.402.401z"
            />
          </g>
        </g>
        <g
          class="url-bar"
          opacity="0"
          style="transform-origin: center; transform-box: fill-box; pointer-events: none;"
        >
          <rect
            width="4.398"
            height=".704"
            x="2.514"
            y="4.928"
            ry=".244"
            fill="#fff"
            stroke="#4d4d4d"
            stroke-width=".072"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dashoffset="16.97"
            paint-order="markers fill stroke"
          />
          <text
            style="line-height:1.25;-inkscape-font-specification:'Ubuntu, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
            x="2.987"
            y="5.475"
            font-weight="400"
            font-size=".585"
            font-family="Ubuntu"
            letter-spacing="0"
            word-spacing="0"
            stroke-width=".243"
          >
            <tspan
              x="2.987"
              y="5.475"
              style="-inkscape-font-specification:'Ubuntu, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal"
            >
              www.foo.bar
            </tspan>
          </text>
        </g>
      </g>
      <g
        class="airplane"
        // @ts-ignore
        fill="#888f9b"
        style="transform-origin: center; transform-box: fill-box; pointer-events: none;"
      >
        <path d="M4.705 6.408s.315-.613.385-2.346l2.287.414.002-.214-2.25-1.285-.02-1.28s-.08-.539-.335-.74c-.05-.037-.087-.033-.138 0-.255.201-.335.74-.335.74l-.02 1.28-2.25 1.285.002.214 2.287-.414c.07 1.733.385 2.346.385 2.346" />
        <path d="M6.032 6.182v-.314l-1.327-.46-1.323.46v.319l1.323-.212z" />
        <rect width=".392" height=".635" x="5.435" y="2.875" ry=".102" />
        <rect width=".392" height=".635" x="6.034" y="3.177" ry=".102" />
        <rect
          width=".392"
          height=".635"
          x="-3.987"
          y="2.875"
          ry=".102"
          transform="scale(-1 1)"
        />
        <rect
          width=".392"
          height=".635"
          x="-3.387"
          y="3.177"
          ry=".102"
          transform="scale(-1 1)"
        />
        <path d="M2.896 4.549a.106.106 0 00-.106.106.106.106 0 000 .01l.09 1.545L3 4.67a.106.106 0 000-.016.106.106 0 00-.105-.106zm-.731.329a.106.106 0 00-.107.107.106.106 0 00.001.01l.089 1.543.122-1.537a.106.106 0 000-.016.106.106 0 00-.105-.107zm4.437-.329a.106.106 0 00-.106.106.106.106 0 000 .01l.089 1.544.122-1.538a.106.106 0 00.001-.016.106.106 0 00-.106-.106zm.674.329a.106.106 0 00-.106.107.106.106 0 000 .01l.09 1.543.121-1.537a.106.106 0 00.002-.016.106.106 0 00-.107-.107z" />
      </g>
    </svg>
  );
};

export const ResponsiveIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.413 7.684">
      <defs>
        <clipPath clipPathUnits="userSpaceOnUse" id="responsive-a">
          <rect
            width="5.099"
            height="3.14"
            x="2.469"
            y="1.861"
            ry=".483"
            fill="#fff"
            stroke-width=".253"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dashoffset="16.97"
            paint-order="markers fill stroke"
            class="monitor-mask"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="responsive-b">
          <rect
            width="2.861"
            height="3.555"
            x="1.109"
            y="2.555"
            ry="0"
            class="mobile-mask"
            fill="#fff"
            stroke-width=".031"
            stroke-linecap="round"
            stroke-dashoffset="16.97"
          />
        </clipPath>
      </defs>

      <g
        class="main-container"
        style="transform-origin: center; transform-box: fill-box;"
      >
        <g class="main-inner" style="transform-origin: center; ">
          <g class="main-inner-rotate" style="transform-origin: center; ">
            <path
              d="M4.541 4.924v.709s-.017.117-.078.182a.71.71 0 01-.22.119h1.551s-.16-.055-.22-.12a.39.39 0 01-.078-.181v-.709z"
              class="desktop-stand"
              fill="#888f9b"
            />
            <g
              class="page-container"
              clip-path="url(#responsive-a)"
              style="transform-origin: center; "
            >
              <g
                class="page-inner"
                style="transform-origin: center;  transform-box: fill-box"
              >
                <g class="page" opacity="0" style="transform-origin: center;">
                  <rect
                    width="11.987"
                    height="7.158"
                    x="-1.316"
                    y="1.723"
                    ry="0"
                    fill="#fff"
                    class="page-body"
                  />
                  <path
                    d="M10.685-.13v1.853h-11.99V-.13c4.202.006 8.362.001 11.99 0z"
                    class="navbar-bg"
                    fill="#5d8aff"
                    paint-order="markers fill stroke"
                  />
                  <path
                    d="M1.656 1.48l-.274-.116.274-.46.273.46z"
                    class="logo"
                    fill="#0030ab"
                    paint-order="markers fill stroke"
                  />
                  <g class="nav-links">
                    <rect
                      width=".94"
                      height=".188"
                      x="7.174"
                      y="1.156"
                      ry=".068"
                      class="nav-link-2"
                      style="transform-origin: center; transform-box: fill-box;"
                      fill="#0030ab"
                      paint-order="markers fill stroke"
                    />
                    <rect
                      width=".94"
                      height=".188"
                      x="5.774"
                      y="1.156"
                      ry=".068"
                      class="nav-link-1"
                      fill="#0030ab"
                      style="transform-origin: center; transform-box: fill-box;"
                      paint-order="markers fill stroke"
                    />
                    <rect
                      width=".94"
                      height=".188"
                      x="4.374"
                      y="1.156"
                      ry=".068"
                      class="nav-link-0"
                      style="transform-origin: center; transform-box: fill-box;"
                      fill="#0030ab"
                      paint-order="markers fill stroke"
                    />
                  </g>
                  <g class="page-content-column-0">
                    <rect
                      width="1.561"
                      height="1.305"
                      x="1.07"
                      y="1.933"
                      ry=".032"
                      fill="#ffd287"
                      paint-order="markers fill stroke"
                    />
                    <path
                      d="M1.118 3.725h1.437m-1.437.446h.895m-.895.447h1.437"
                      class="page-text"
                      fill="none"
                      stroke="#9597a5"
                      stroke-width=".159"
                    />
                  </g>
                  <g class="page-content-column-1">
                    <rect
                      width="1.561"
                      height="1.305"
                      x="3.061"
                      y="1.933"
                      ry=".032"
                      fill="#77ffd1"
                      paint-order="markers fill stroke"
                    />
                    <path
                      d="M3.082 3.725h.964m-.964.446h1.437m-1.437.447h1.437"
                      class="page-text"
                      fill="none"
                      stroke="#9597a5"
                      stroke-width=".159"
                    />
                  </g>
                  <g class="page-content-column-2">
                    <rect
                      width="1.561"
                      height="1.305"
                      x="5.053"
                      y="1.933"
                      ry=".032"
                      fill="#e881ff"
                      paint-order="markers fill stroke"
                    />
                    <path
                      d="M5.096 3.725h1.437m-1.437.446h1.437m-1.437.447h.817"
                      class="page-text"
                      fill="none"
                      stroke="#9597a5"
                      stroke-width=".159"
                    />
                  </g>
                  <g class="page-chat" paint-order="markers fill stroke">
                    <rect
                      width="1.561"
                      height="3.536"
                      x="6.986"
                      y="1.933"
                      ry=".086"
                      fill="#acc1ff"
                    />
                    <rect
                      width="1.367"
                      height=".272"
                      x="7.076"
                      y="5.063"
                      ry=".007"
                      fill="#f9f9f9"
                      class="page-chat-input"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g class="screen-container">
              <rect
                width="5.099"
                height="3.14"
                x="2.469"
                y="1.861"
                ry=".483"
                fill="none"
                stroke="#888f9b"
                stroke-width=".253"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dashoffset="16.97"
                paint-order="markers fill stroke"
                class="monitor-border"
              />
            </g>
            <g clip-path="url(#responsive-b)" class="mobile-container">
              <rect
                width="1.746"
                height="2.83"
                x="1.847"
                y="2.983"
                ry=".284"
                class="mobile"
                fill="#25385b"
                stroke="#888f9b"
                stroke-width=".251"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>
        </g>
      </g>
      <g
        class="laptop-bottom"
        paint-order="markers fill stroke"
        opacity="0"
        style="transform-origin: center; "
      >
        <path
          d="M.445 5.934h8.522c.071 0 .081.081.028.131-.079.075-.188.185-.228.224H.645c-.094-.063-.14-.137-.228-.224-.053-.05-.043-.131.028-.131z"
          fill="#888f9b"
        />
        <rect
          width="1.343"
          height=".193"
          x="4.034"
          y="5.934"
          ry=".046"
          fill="#545a64"
        />
      </g>

      <g class="tablet-bars" opacity="0" style="transform-origin: center;">
        <g class="tablet-bars-inner" style="transform-origin: center;">
          <g style="transform: translateY(0.2px);">
            <g
              class="tablet-bar-bottom"
              style="transform-origin: right bottom; transform-box: fill-box;"
              paint-order="markers fill stroke"
            >
              <path d="M7.751 1.715l.51.037v4.18l-.51.099z" fill="#888f9b" />
              <circle cx="8.036" cy="3.801" r=".157" fill="#545a64" />
            </g>
            <g
              class="tablet-bar-top"
              style="transform-origin: left bottom; transform-box: fill-box;"
            >
              <path
                d="M1.636 1.715l-.51.037v4.18l.51.099z"
                fill="#888f9b"
                paint-order="markers fill stroke"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
