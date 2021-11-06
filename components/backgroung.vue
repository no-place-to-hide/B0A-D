<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

div.grid-container {
    margin: 3px;
    height: calc(100vh - 6px);
    width: calc(100vw - 6px);
    display: table;
    background: #222;
}

div.grid-bg {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
    background-repeat: no-repeat;
    pointer-events: none;
    mix-blend-mode: multiply;
}

pre.grid {
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 8px;
    font-family: 'Press Start 2P';
    display: table-cell;
    color: #fff;
    position: relative;
    background: #000;
    mix-blend-mode: lighten;
}
</style>

<template>
    <client-only>
        <div class="grid-container">
            <pre class="grid" ref="grid">
            <div class="grid-bg" ref="grid-bg"/>
            <div class="grid-content" ref="grid-content" />
        </pre>
        </div>
    </client-only>
</template>

<script lang="ts">
import { Component, Vue, Ref, Watch } from 'vue-property-decorator';

@Component
export default class Background extends Vue {
    mounted() {
        this.$nextTick(() => {
            this.updateDimensions();
            setTimeout(this.updateDimensions, 0);
            setTimeout(this.renderContents, 0);
            window.addEventListener('resize', this.updateDimensions);
        });
    }

    @Ref('grid')
    gridElem!: HTMLDivElement;

    @Ref('grid-bg')
    gridElemBg!: HTMLDivElement;

    @Ref('grid-content')
    gridElemContent!: HTMLDivElement;

    colCount = 0;
    rowCount = 0;

    get pixelCount() {
        return this.colCount * this.rowCount ?? 0;
    }

    pixels: string[] = [];

    readonly charRangeStart = 33;
    readonly charRangeEnd = 126;
    readonly charRangeMax = this.charRangeEnd - this.charRangeStart;

    readonly gridFontSize = 50; /*parseInt(
        getComputedStyle(this.gridElem).fontSize,
        10
    );*/

    generate(ticks: number) {
        let cx = Math.floor(this.colCount / 2);
        let cy = Math.floor(this.rowCount / 2);

        for (let i = 0; i < this.pixelCount; i++) {
            let x = i % this.colCount;
            let y = Math.floor(i / this.colCount);

            let t = 100 + ticks * 0.001;
            let v =
                (Math.cos((x - cx) / 8.0) + Math.sin((y - cy) / 8.0) + t) * 16;

            let charVal = v % this.charRangeMax;

            this.pixels[i] = String.fromCharCode(
                this.charRangeStart + (charVal % this.charRangeMax)
            );
        }
    }

    generateColors() {
        let bgImage = [];
        let bgImageParts = [];
        let percent = 0;

        const percentInterval = 100 / this.colCount;

        for (let i = 0; i < this.pixelCount; i++) {
            let pixel = this.pixels[i];

            let hslAngle =
                ((pixel.charCodeAt(0) - this.charRangeStart) /
                    this.charRangeMax) *
                360;
            let pixelColor = `hsl(${hslAngle}, 70%, 50%)`;

            let bgImagePart = `${pixelColor} ${percent}%`;
            percent += percentInterval;
            bgImagePart += `, ${pixelColor} ${percent}%`;

            bgImageParts.push(bgImagePart);

            if ((i + 1) % this.colCount === 0) {
                bgImage.push(
                    `linear-gradient(to right, ${bgImageParts.join(', ')})`
                );

                percent = 0;
                bgImageParts = [];
            }
        }

        this.gridElemBg.style.backgroundImage = bgImage.join(',');
    }

    renderContents(ticks = 0) {
        this.generate(ticks);
        this.generateColors();

        let content = '';

        //content += colCount + " x " + rowCount + " = " + pixelCount + "\n";

        content = this.pixels.reduce((prev, curr, idx) => {
            return prev + curr + ((idx + 1) % this.colCount === 0 ? '\n' : '');
        });

        this.gridElemContent.innerHTML = content;

        requestAnimationFrame(this.renderContents);
    }

    updateDimensions() {
        this.colCount = Math.floor(
            this.gridElem?.clientWidth ?? 0 / this.gridFontSize
        );
        this.rowCount = Math.floor(
            this.gridElem?.clientHeight ?? 0 / this.gridFontSize
        );

        this.pixels = [1].map((_) => String.fromCharCode(this.charRangeStart));

        let bgSize = [];
        for (let row = 0; row < this.rowCount; row++) {
            bgSize.push(
                `${this.colCount * this.gridFontSize}px ${
                    row * this.gridFontSize
                }px`
            );
        }
        this.gridElemBg.style.backgroundSize = bgSize.join(',');

        this.renderContents();
    }
}
</script>
